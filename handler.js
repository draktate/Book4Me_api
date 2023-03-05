'use strict';
import app from "./app.js"
import ServerlessHttp from "serverless-http";
const hello=ServerlessHttp(app);
export default hello;