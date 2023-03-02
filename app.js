import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import path from 'path';
const __dirname = path.resolve();

import cors from "cors";

import cookieParser from "cookie-parser";

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
//const allowedOrigins = ['http://localhost:3000','http://yourapp.com'];
const allowedOrigins = process.env.ORIGINs.split(','); 

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']

}))

/*
app.use(cors({
        origin: function(origin, callback){
          // allow requests with no origin 
          // (like mobile apps or curl requests)
          if(!origin) return callback(null, true);
          if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                      'allow access from the specified Origin.';
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        }
      }));

*/
      console.log("allowed from origins: ",allowedOrigins )
//    app.use(cors(corsOptions));


app.use(cookieParser());
app.use(express.json());



//middleware
 //app.get("/",   (req, res)=> { console.log("dir:", __dirname), res.sendFile(path.join(__dirname+'/index.html'))  }  ) 
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

})


 app.listen(process.env.PORT||7200, async()=> { 
    await connect();
    console.log("Connect to the backend is succesfull:", error);
   console.log("MONGO:", process.env.MONGO);
});

mongoose.connection.on("disconnected", ()=>{console.log("MongoDB disconnected!")})
mongoose.connection.on("connected", ()=>{console.log("MongoDB  connected!")})
