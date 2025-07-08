import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {

    try {
        await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        )
        console.log("connected to mongodB successfully");
        

    } catch (error) {
        console.log("MongoDB connect failed !!", error)
        process.exit(1)

    }

}

export default connectDB