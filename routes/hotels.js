import express, { response } from "express";
import restart from "nodemon";

import mongoose from "mongoose";
import {createError} from "../utils/error.js"
import {createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType, getHotelRooms} from "../controlers/hotel.js"
import {verifyToken,verifyUser, isAdmin} from "../utils/verifyToken.js"




const router = express.Router();

//Create
router.post("/", isAdmin, createHotel);

//Update
router.put("/:id",isAdmin, updateHotel);

//delete 
router.delete("/:id",isAdmin,  deleteHotel);

//selectOne


router.get("/find/:id", getHotel);


router.get("/", getAllHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);



export default router; 