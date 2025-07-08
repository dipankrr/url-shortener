import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
})


connectDB().then( () => {
    app.listen(8001, () => {
    console.log( 'express server started port: PORT_NO ');
})

}).catch(
    (error) => {
        console.log("Express server failed", error);
        
    }
)