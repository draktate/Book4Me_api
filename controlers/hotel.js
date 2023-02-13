import Hotel from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";

const  createHotel= async (req, res,next)=>{
    const newHotel = new Hotel(req.body);

    try{
            //console.log("Getting data in hotels.js");

            //console.log("newHotel:", newHotel);
            const savedHotel = await newHotel.save();
            console.log("Data saved successfull")
            res.status(200).json(savedHotel);
    }
    catch(err){
        next(err);

    }
}

const  updateHotel= async (req, res,next)=>{
    const newHotel = new Hotel(req.body);
    try
    {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set:req.body} , {new:true});
    
        console.log("Data updated successfully")
        res.status(200).json(updatedHotel );
    }
    catch(err)
    {
        next(err);

    }

}

const  deleteHotel= async (req, res,next)=>{

    try{
        
        await Hotel.findByIdAndDelete(req.params.id);

       
       console.log("Data deleted successfully")
       res.status(200).json("Hotel has been deleted" );
    }
    catch(err){
        next(err);

    }

}

const  getHotel= async (req, res,next)=>{
    try{
        
        const hotel = await Hotel.findById(req.params.id);

       
       console.log("Got data")
       res.status(200).json(hotel );
    }
    catch(err){
        next(err);

    }

}

const  getAllHotels= async (req, res,next)=>{

    const {min, max, ...others} = req.query;
    console.log("min:", min)
    console.log("max:", max)
    
    console.log("query:", "gt:", min==undefined?1:min ," lt:", max==undefined?99999999:max  )

    try{

        console.log("others:", others)
        
        const hotels = await Hotel.find({
            ...others, 
            cheapestPrice:{ $gt: min==undefined?1:min , $lt:max==undefined?99999999:max}
        });
        res.status(200).json(hotels );
    }
    catch(err){
        next(err)
  
    }


}



const  countByCity= async (req, res,next)=>{
    const cities = req.query.cities.split(",");

    console.log("cities:", cities)

    try{


        
        const hotelList = await Promise.all(cities.map( city=>{
            return Hotel.countDocuments({city:city});

        }));

       
       console.log("Got data")
       res.status(200).json(hotelList);
    }
    catch(err){
        next(err);

    }

    
}
const  countByType= async (req, res,next)=>{


    try{    
    
    const hotelBytype=[];
    const hotelCount = await Hotel.countDocuments({type:"hotel"});
    hotelBytype.push({type:"hotel", count:hotelCount});

    const apartmentCount = await Hotel.countDocuments({type:"apartment"});
    hotelBytype.push({type:"apartment", count:apartmentCount});

    const resourtCount = await Hotel.countDocuments({type:"resort"});
    hotelBytype.push({type:"resort", count:resourtCount});

    const villaCount = await Hotel.countDocuments({type:"villa"});
    hotelBytype.push({type:"villa", count:villaCount});

    const cabinCount = await Hotel.countDocuments({type:"cabin"});
    hotelBytype.push({type:"cabin", count:cabinCount});

    
        res.status(200).json(hotelBytype);
    }
    catch(err){
        next(err);

    }

}

const getHotelRooms = async (req,res, next)=>{
    try{


        console.log("getHotelRooms:", req.params.id)
        const hotel = await Hotel.findById(req.params.id );
        console.log("rooms:", hotel.rooms)
        const list= await Promise.all(hotel.rooms.map((room)=>{ 
            console.log("room:", room)
            return Rooms.findById(room)} ))
        res.status(200).json(list)

    }
    catch(e)
    {
        next(e)
    }

}



export  {createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType, getHotelRooms};