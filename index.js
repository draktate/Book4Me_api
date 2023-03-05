'use strict';
import app from "./app.js"
//const app= require('./app')
import serverless from "serverless-http";
let hello=null
try{
     hello =  serverless(app)
    
}catch(err) {
    console.log(err)
}

export default hello;

