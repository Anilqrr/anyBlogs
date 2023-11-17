const express = require('express')
const {body, validationResult, header} = require('express-validator')
const bcrpty = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const userModel = require('../model/Users')
const usertoken = require('../middleware/usertoken')
const Users = userModel.Users
const router = express.Router()
const JWT_SECURITY = "@nil|kantariya@#$%!!";


const Storage = multer.diskStorage({
      destination:"D:/React_Projects/anyblogs/public/images",
      filename:(req,file,cb)=>{
           cb(null, file.originalname);
      }
 })

 const upload = multer({
      storage:Storage
 }).single('imagetest')

router
// Create User To Signup 
.post('/signup',[
      body('username',"UserName Must be 3 Character and Can't be blank").trim().isLength({min:3}),
      body('email',"Sorry Email is Not Valid!").trim().isEmail(),
      body('password',"Password Must be 6 to 8 Character").trim().isLength({min:6,max:8}).notEmpty(),
      body("gender","Gender can't be Empty").isLength({max:1}).trim().notEmpty(),
], async(req,res)=>{
      let success = false
      const error = validationResult(req)
      if(!error.isEmpty()){
            return res.send({error:error.array()})
      }
      
      try {
            const CheckUser = await Users.findOne({$or:[{username:req.body.username},{email:req.body.email}]})
            if(!CheckUser){
            const salt= await bcrpty.genSalt(10)
            const secpass = await bcrpty.hash(req.body.password,salt)
            const user = await Users(req.body)
                 user.password = secpass;
                 const id = {
                  user:{
                        id:user.id
                  }
                 }
                 const token = jwt.sign(id,JWT_SECURITY)
                  await user.save()
                  success = true
                  res.json({user,token,success})
      }
      else{
            throw("User Alreay Exist! Please Change Your Email or Username") 
      }
     } catch (err) {
        res.status(400).json({success,error:err})
        console.log(err)
     }


     
})

// login User
.post('/login',[
      body('email',"Email is Invalide").isEmail(),
      body('password',"Password Can't Be Black").notEmpty().exists()
],
async(req,res)=>{
      let success = false
      const error = validationResult(req)
      if(!error.isEmpty()){
            return res.send({success,error:error.array()})
      }
      const {email,password} = req.body
      try {

      const user = await Users.findOne({email})
      if(!user)
      {
            throw("User Not Exist!")
      }
      const verifyPassword = await bcrpty.compare(password,user.password)
      
      if(!verifyPassword)
      {
            throw("Your Caredenciale Not Exist!")
      }
      else{
            const payload = {
                  user:{
                        id: user.id
                  }
            }
            const token = jwt.sign(payload,JWT_SECURITY)
            success = true
            res.json({success,token})
      }
      } catch (err) {
            res.status(400).send({success,err})
            console.log(err)
      }
      
})
.post('/getuser',usertoken, async (req,res)=>{
            const userId =  req.user.id
            const user = await Users.findById(userId)
            res.send(user)
})

.patch('/userprofileupdate/:id',usertoken,async(req,res)=>{
      try {
           
            const id  = req.params.id
           upload(req,res,async(err)=>{
      //       //     const {image} = req.body
               if(err)
               {
                throw("Image Error")
               }
               else{
                let user = await Users.findById(id)
                console.log(user.id)
                if(user.id.toString()!==req.user.id){
                     return res.status(401).send("Not Allowed")
                }
                user = await Users
                .findByIdAndUpdate(id,{$set:{image:`images/${req.file.filename}`}},{new:true})
                res.send(user)
               }
           })
           
      } catch (error) {
           res.send(401).send({error})
      }
 })
module.exports.routers = router;
// "eyJhbGciOiJIUzI1NiJ9.NjUzNWY5Y2U2NGEwZjE2MTAzYTM2NGRl.fsklqcpeYKoh5RgTt0AKMQLLTZhgn8FnDrX3QOX0C5g"

// eyJhbGciOiJIUzI1NiJ9.NjUzNWY5Y2U2NGEwZjE2MTAzYTM2NGRl.fsklqcpeYKoh5RgTt0AKMQLLTZhgn8FnDrX3QOX0C5g