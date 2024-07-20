import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user

const loginUser = async(req,res)=>{

    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})

        if (!user) {
            res.json({success : false , message : "User Does not exists"})
        }
        const isMatched = await bcrypt.compare(password,user.password)

        if (!isMatched) {
            return  res.json({success : false , message : "Invalid credentials"})
        
        }

        const token = createToken(user._id)
        res.json({success : true ,token})
        

    } catch (error) {
        console.log(error);
        res.json({success : false , message : "Error to Login User"})
        
    }

}

//register user 

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const registerUser = async(req,res)=>{
    const {name , password , email} = req.body
    try {
        //checking is user already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false,message: "User Already Exists"})
        }
        //validate email formate and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message: "Please Enter Valid Email"})
        } 
        if (password.length<8) {
            return res.json({success:false,message: "Please Enter Strong Password | minimum 8 char"})
           }
           //hash password
           const salt = await bcrypt.genSalt(10)
           const hashedPassword = await bcrypt.hash(password,salt)

           const newUser = new userModel({
            name :name ,
            email:email ,
            password:hashedPassword ,
           })

           const user = await newUser.save()
           const token = createToken(user._id)
           res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message : "Error to create user"})

    }
}

export {loginUser,registerUser}