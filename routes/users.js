import express from "express";
import {createError} from "../utils/error.js"
import {createUser, updateUser, deleteUser, getUser, getAllUsers} from "../controlers/users.js"


import {verifyToken,verifyUser, isAdmin} from "../utils/verifyToken.js"
const router = express.Router();
/*
router.get("/", verifyUser, (req, resp)=>{
    resp.send("hello this is users route.")
});

router.get("/checkAuthentication", verifyToken, (req, res, next) =>{
    res.send("Welcome to Hotel bookings! You are authenticated")
});

 router.get("/checkUser/:id", verifyUser, (req, res, next) =>{
    res.send("Hellow there , you can delete your account.")
});

router.get("/isAdmin/:id", isAdmin, (req, res, next) =>{
    res.send("Hellow Admin, You can admin any account!")
});

*/




//Create
router.post("/", createUser);

//Update
router.put("/:id", verifyUser, updateUser);

//delete 
router.delete("/:id",verifyUser, deleteUser);

//selectOne

router.get("/:id",verifyUser, getUser);


router.get("/",isAdmin, getAllUsers);


export default router;