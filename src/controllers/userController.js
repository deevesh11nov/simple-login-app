const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SCERET_KEY=process.env.SCERET_KEY;




const signup =async (req,res)=>{
    
    const {username,password,email} = req.body;
    try {
        //Existing user check
        const existinguser = await userModel.findOne({email:email});
        if(existinguser){
            return res.status(400).json({message:'user already exists'})
        }
        //Hashing the password
        const hashPassword = await bcrypt.hash(password,10)
        
        //User Creation
        const result =await userModel.create({
            email:email,
            username:username,
            password:hashPassword
        })

        //JWT Token creation
        const token = jwt.sign({email:result.email, id:result._id},SCERET_KEY)
        res.status(201).json({user:result,token:token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"})
    }

}

const signin=async (req,res)=>{
       const {email,password}= req.body
    try {
       
        const existinguser =await userModel.findOne({email:email})
    
        if(!existinguser){
            return res.status(404).json({message:"user do not exist"});
        }
    
        const comparePassword = await bcrypt.compare(password,existinguser.password)
        if(!comparePassword){
            return res.status(400).json({message:"Wrong Password"})
        }
        //JWT Token creation
        const token = jwt.sign({email:existinguser.email, id:existinguser._id},SCERET_KEY)
        res.status(200).json({user:existinguser,token:token})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"})
    }
   

}

module.exports={signin,signup}
