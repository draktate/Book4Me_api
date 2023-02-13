import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";


const register = async (req,res,next)=>{
    try{

            const salt = bcrypt.genSaltSync(10);
            const hash=  bcrypt.hashSync(req.body.password, salt)
            const newUser = new User({
            ...req.body,
            password:hash
        });

        await newUser.save();
        res.status(200).send("User has been created");

    }
    catch(err)
    {
        next(err)
    }
}    

const login = async (req,res,next)=>{
    try{
        const user= await User.findOne({username:req.body.username});
        if(!user)
        {
            return next(createError(404, "User does not exists. Please register yourself"  ))
        }

        const passwordMatched = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatched)
        {
            return next(createError(403, "Invalid password or User Name, please check. "  ))   
        }
  
        const token= jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)
        const {password, isAdmin, ...otherDetails} = user._doc;
        //console.log("other Details:")
        //console.log(otherDetails)


        res.cookie("access_token", token, {httpOnly:true})
        .status(200)
        .json({details:{...otherDetails},isAdmin});

    }
    catch(err)
    {
        next(err)
    }
}    


export  {register,login}; 