const userSchema = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../Model/UserModel')
require('dotenv')

const register =async(req,res)=>{
    
    try {
       const {name,email,password} = req.body
       const checkEmail = await userSchema.findOne({email})
       const checkUsername = await userSchema.findOne({name})
       if(checkEmail){
        return res.json({message:"This email is already registered",status:false})
       }
       if(checkUsername){
        return res.json({message:"This username is already registered",status:false})
       }
       const hashedPassword = await bcrypt.hash(password,10)
       const newUser = {name,
        password:hashedPassword,
        email
    }
       const user = await userSchema.create(newUser)
      
       res.status(201).json({user,status:true})
    } catch (error) {
        res.status(401).json({message: `${error.message}`,status:"error"})
    }
}

const login = async(req,res)=>{
    try {
       const {name,password} = req.body
       const user = await userSchema.findOne({name})
       if(!user){
        return res.json({message:"user not found",status:false})
       }
       const match = await bcrypt.compare(password,user.password)
       if(!match){
        return res.json({message:"Invalid Password",status:false})
       }
       const token = jwt.sign({"username": user.name},process.env.JWT,{expiresIn: '1d'})
       const userObject = user.toObject()
       delete userObject.password;
       userObject.token = token;
       res.status(201).json({user:userObject,status:true})
    } catch (error) {
        res.status(401).json({message: `${error.message}`,status:false})
    }
}


const findUser = async(req,res) =>{
     const userId = req.params.userId;
     try {
         const user = await UserModel.findById(userId);
         res.status(200).json(user);

     } catch (error) {
        res.status(500).json(error);
     }
}

const getuser = async(req,res) =>{
    try {
         const users = await UserModel.find()
         res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
module.exports = {register,login,findUser,getuser}