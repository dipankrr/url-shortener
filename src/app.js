import express from "express"; 

const app = express()


// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
app.use(express.json({limit: "16Kb"}))
app.use(express.urlencoded({limit: "16kb", extended: true}))



// import 
import urlRoute from "./routes/url.routes.js"


// define 
app.use("/", urlRoute)






 export default app

