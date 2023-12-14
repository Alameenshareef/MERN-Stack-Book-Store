import  express  from "express";
import { PORT,MONGO } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js"
import cors from "cors"
const app = express()
// middleware for parsing request body
app.use(express.json())


// middleware for handling CORS POLICY
// option1: Allow all orgins with Default of cors(*)
app.use(cors())

// Option2 : Allow custom origins
// app.use({
//     origin: 'http://localhost:3000',
//     methods: ['GET' , 'POST' , 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']

// })
app.get("/",(req,res)=>{
    console.log(req);
    return res.status(200).send("Welcome Iam Here")
})


app.use("/books", booksRoute) 

const connect = ()=>{
    try {
       mongoose.connect(MONGO) 
       console.log('mongodb connected');
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log('mongodb disconnected');
})


app.listen(PORT,()=>{
    connect()
    console.log(`App listening on the port: ${PORT}`);
})