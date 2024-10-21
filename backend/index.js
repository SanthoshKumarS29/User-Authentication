import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/DB.js";
import authRoutes from './routes/authRoutes.js'

const app = express()
// MiddleWare
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)



dotenv.config()
const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server Is Running ${port}`)
    connectDB()
})
