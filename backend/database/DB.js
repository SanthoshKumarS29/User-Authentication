import mongoose from "mongoose";

const connectDB = async  (req,res) => {
    try{
        await mongoose.connect(process.env.DB)
        console.log("Db COnnected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB