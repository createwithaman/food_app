import foodModel from "../models/food.model.js"
import fileSystem from "fs" 

//add food item

const addFood = async(req,res)=>{

    let imageFileName = `${req.file.filename}` 

    const  food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : imageFileName,

    })
    try {
        await food.save()
        res.json({success : true,message : "food added"})
    } catch (error) {
        console.log(error);
        res.json({success : false,message : "error adding food"})
    }

}

//all food list
const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({success : true , data : foods})
    } catch (error) {
        console.log(error);
        res.json({success : false , message : "error"})
    
    }
}

//remove food 
const removeFood = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fileSystem.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success : true,message : "food removed"})
    } catch (error) {
        console.log(error);
        res.json({success : false,message : "food not removed"})
        
    }
}

export {addFood ,listFood , removeFood}