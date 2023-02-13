import express, { response } from "express";
import restart from "nodemon";

import mongoose from "mongoose";
import {createError} from "../utils/error.js"
import {createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomAvailability} from "../controlers/room.js"
import {verifyToken,verifyUser, isAdmin} from "../utils/verifyToken.js"




const router = express.Router();

//Create
router.post("/:hotelId", isAdmin, createRoom);

//Update
router.put("/:id",isAdmin, updateRoom);

router.put("/avail/:id", updateRoomAvailability);


//delete 
router.delete("/:id/:hotelId",isAdmin,  deleteRoom);

//selectOne

router.get("/:id", getRoom);


router.get("/", getAllRooms);


export default router; 