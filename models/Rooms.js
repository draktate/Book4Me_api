import { Int32 } from "mongodb";
import mongoose from "mongoose";

const Room= new mongoose.Schema(
{
    title :{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true
    },

    desc:{
        type:String,
        required:false
    },
    roomNumbers: [{roomNo: String, bookedFor:{type:[Number]}}]
    
     
}, {timestamps:true})

export default mongoose.model("Rooms", Room);