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

const app = express();

    //credentials:true,            
    //access-control-allow-credentials:true
    //access-control-allow-origin:*,
    //const allowedOrigins = ['http://localhost:3000','https://master.d1zn1rfcz5wa41.amplifyapp.com'];
   // const allowedOrigins = process.env.ORIGINS.split(','); 

app.use(cors())

app.use((req, res, error, next)=>{
    res.header("Access-control-Allow-Origin","*");
    res.header("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
    if(req.method==="OPTIONS"){
      res.header("Access-control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  }
)

app.use(cookieParser());
app.use(express.json());


//middleware
 app.get("/",   (req, res)=> { console.log("dir:", __dirname), res.sendFile(path.join(__dirname+'/index.html'))  }  ) 
 app.use("/api/auth", authRoute);
 app.use("/api/users", usersRoute);
 app.use("/api/hotels", hotelRoute);
 app.use("/api/rooms", roomsRoute);
 app.use((err, req, resp, next)=>{

  const errorStatus=err.status || 500;
  const errorMessage=err.message || "Something went wrong!"

  return resp.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
  })

});

export default app;