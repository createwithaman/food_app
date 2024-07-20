import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://amanaasti04:amanaasti04@cluster0.gq7d6pl.mongodb.net/food-del').then(()=>{
        console.log(`database connected`);
    })
}

