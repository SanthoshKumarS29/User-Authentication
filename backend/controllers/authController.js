import { Users } from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendMail from "../middleware/Mail.js";

// New User Registration
export const register = async (req,res) => {
    try {
        const {username,email,password} = req.body;
        let user = await Users.findOne({ email })
        // COde to check email add already exits
        if (user){
            res.status(400).json({
                message: "User email already Exits",
            })   
        }
        // COde to Convert Raw Pass to hashed pass
        const hashedPassword = await bcrypt.hash(password,5)

        //  Generate OTP
        const otp = Math.floor(Math.random() * 1000000)

        // create new user Data
        user = {username ,email,hashedPassword}

        // Create signed acitavtion Token
        const acitavtionToken = jwt.sign({user,otp},process.env.ACTIVATE_KEY,{
            expiresIn:"5m"
        })
        //  Send Email to user
        const message = `Please verify your accuont using OTP is ${otp}`
        await sendMail(email,"Welcome To SK",message)
        return res.status(200).json({
            message: 'OTp Sent your email',
            acitavtionToken,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }

}

// Verify Otp
export const verifyOtp = async (req,res) => {
    try {
        const { otp, acitavtionToken } = req.body
        const verify = jwt.verify(acitavtionToken,process.env.ACTIVATE_KEY)
        if(!verify){
            return res.json({message:"Otp Expiered"})
        }

        if(Number(verify.otp) !== Number(otp)){
            return res.json({message:"Wrong Otp"})
        }

        await Users.create({
            username:verify.user.username,
            email:verify.user.email,
            password:verify.user.hashedPassword,
        })
        res.status(200).json({
            message: "user Registration Success",
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

// Login User
export const login = async (req,res) => {
    try {
        const { email,password } = req.body
        // Check Useremail Address
        const user = await Users.findOne({email}) 
        if(!user) {
            return res.status(400).json({
                message:"invalid Cerdintials"
            })
        }
        // Check Password
        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword) {
            return res.status(400).json({
                message:"invalid Cerdintials"
            })
        }
        // Generate Sigined Token
        const token = jwt.sign({_id:user._id},process.env.JWT_SAAVI,{expiresIn:'15d'})
        // exclude the paass felf bfor send resp
        const {password: userPassword, ...userDestails} = user.toObject()


        return res.status(200).json({
            message:"Welcome"  + user.username,
            token,
            userDestails,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

// user Profile
export const myProfile = async (req,res) => {
    try {
        const user = await Users.findById(req.user._id).select("-password")
        return res.status(200).json({
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}