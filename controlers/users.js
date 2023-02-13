import User from "../models/User.js";
import bcrypt from "bcryptjs";

const  createUser= async (req, res,next)=>{


    const salt = bcrypt.genSaltSync(10);
    const hash=  bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
    ...req.body,
    password:hash
});



    try{
            const savedUser = await newUser.save();
            console.log("Data saved successfull")
            res.status(200).json(savedUser);
    }
    catch(err){
        next(err);

    }
}


const  updateUser= async (req, res,next)=>{
    const newUser = new User(req.body);
    try
    {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set:req.body} , {new:true});
    
        console.log("Data updated successfully")
        res.status(200).json(updatedUser );
    }
    catch(err)
    {
        next(err);

    }

}

const  deleteUser= async (req, res,next)=>{

    try{
        
        await User.findByIdAndDelete(req.params.id);

       
       console.log("Data deleted successfully")
       res.status(200).json("User has been deleted" );
    }
    catch(err){
        next(err);

    }

}

const  getUser= async (req, res,next)=>{
    try{
        
        const user = await User.findById(req.params.id);

       
       console.log("Got data")
       res.status(200).json(user );
    }
    catch(err){
        next(err);

    }

}

const  getAllUsers= async (req, res,next)=>{

    try{
        
        const users = await User.find();
        res.status(200).json(users );
    }
    catch(err){
        next(err)
  
    }


}


export  {createUser, updateUser, deleteUser, getUser, getAllUsers};