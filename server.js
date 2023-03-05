import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import path from 'path';
import cors from "cors";
import cookieParser from "cookie-parser";
import app from "./app.js";
import http from "http";


const __dirname = path.resolve();

// mongodb+srv://draktate:<password>@cluster0.cxodglc.mongodb.net/?retryWrites=true&w=majority
dotenv.config();


let error="";

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

const connect = async() =>{ 
     try{
        console.log("connecting to :",process.env.MONGO )
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO, options)
        .then(()=> { error="MONGODB connection successfull";})
        .catch((e)=> error="MONGODB connection error:"+e); 

    }
    catch (e)
    {   error="MONGO DB error unknown";
        console.log(e);
        throw e;
    }

}

var httpServer = http.createServer(app);

app.listen(process.env.PORT||7200, async()=> { 
    await connect();
    console.log("Connect to the backend is succesfull:", error);
    console.log("MONGO:", process.env.MONGO);
});

mongoose.connection.on("disconnected", ()=>{console.log("MongoDB disconnected!")})
mongoose.connection.on("connected", ()=>{console.log("MongoDB  connected!")})







//const errorStatus=err.status || 500;
//const errorMessage=err.message || "Something went wrong!"
/*
app.listen(process.env.PORT||7200, async()=> { 
    await connect();
    console.log("Connect to the backend is succesfull:", error);
    console.log("MONGO:", process.env.MONGO);
});
*/

process.on("uncaughtException", err=>{
    console.log(`[uncaughtException] Shutting down server ...`);
    console.log(err.name, err.message);
    console.log(err);
    process.exit(1);
    
})

mongoose.connection.on("disconnected", ()=>{console.log("MongoDB disconnected!")})
mongoose.connection.on("connected", ()=>{console.log("MongoDB  connected!")})

