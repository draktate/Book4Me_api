import Room from "../models/Rooms.js";
import Hotel from "../models/Hotels.js";

const  createRoom= async (req, res,next)=>{
    const hotelId= req.params.hotelId;
    const newRoom = new Room(req.body);
    try{

        const savedRoom =  await newRoom.save();
        try{

            await Hotel.findByIdAndUpdate( hotelId, {
                $push: {rooms: savedRoom._id}
            })

        }
        catch(e)
        {
            next(e);
        }

        res.status(200).json(savedRoom);


    }
    catch(e)
    {
         next(e);

    }

}


const  updateRoom= async (req, res,next)=>{
    const newRoom = new Room(req.body);
    try
    {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set:req.body} , {new:true});
    
        console.log("Data updated successfully")
        res.status(200).json(updatedRoom );
    }
    catch(err)
    {
        next(err);

    }

}


const  updateRoomAvailability= async (req, res,next)=>{
    const newRoom = new Room(req.body);

    const xdates=req.body.bookedFor.map((  xdate)=> new Date(xdate).getTime()) ;

        

    try
    {
        await Room.updateOne({ "roomNumbers._id": req.params.id},
        {
            $push:{
                "roomNumbers.$.bookedFor":[...xdates]
            }
        });

        //const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set:req.body} , {new:true});
    
        console.log("Data updated successfully")
        res.status(200).json("Rooms are booked" );
    }
    catch(err)
    {
        next(err);

    }

}



const  deleteRoom= async (req, res,next)=>{

    const hotelId = req.params.hotelId;

    try{
        
        await Room.findByIdAndDelete(req.params.id);
        
        try
        {

            await Hotel.findByIdAndUpdate( hotelId, {
                $pull: {rooms: req.params.id}
            })

        }
        catch(e)
        {
            next(e);
        }

       
       console.log("Data deleted successfully")
       res.status(200).json("Room has been deleted" );
    }
    catch(err){
        next(err);

    }

}

const  getRoom= async (req, res,next)=>{
    try{
        
        const room = await Room.findById(req.params.id);

       
       console.log("Got data")
       res.status(200).json(room );
    }
    catch(err){
        next(err);

    }

}

const  getAllRooms= async (req, res,next)=>{

    try{
        
        const rooms = await Room.find();
        res.status(200).json(rooms );
    }
    catch(err){
        next(err)
  
    }


}

export  {createRoom, updateRoom, deleteRoom, getRoom, getAllRooms,updateRoomAvailability};