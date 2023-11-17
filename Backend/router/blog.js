const express = require('express')
const multer = require('multer')
const fs = require('fs')
const router = express.Router()
const model = require('../model/Blog')
const userModel = require('../model/Users')
const usertoken = require('../middleware/usertoken')
const Blogs = model.Blog
const Users = userModel.Users

// multer storage
const Storage = multer.diskStorage({
     destination:
          cb(null, "D:/React_Projects/anyblogs/public/uploads"),
     filename:(req,file,cb)=>{
          cb(null, file.originalname);
     }
})

const upload = multer({
     storage:Storage
}).single('imagetest')
// all blogs visible to all user
router.get('/allblogs', async(req, res) => {
     try {
          const blogs = await Blogs.find()
          res.send(blogs)
     } catch (error) {
          res.status(404).send({error,error:"Pleace Cheack Your Internet"})
     }
})

// Only Login User Your Blog Visite.
.get('/alluserblogs',usertoken, async (req,res)=>{
     try {
          let blogs = await Blogs.find({userId:req.user.id})
          res.send(blogs)
     } catch (error) {
          res.status(404)
     }
})

// Create Blog User Login
.post('/blogcreate',usertoken, async (req,res)=>{
     try {
        upload(req,res,async(err)=>{
             const userId =  req.user.id
             if(err)
             {
               throw('image error')
             }
             else
             {
               // if(blog.userId.toString()!==req.user.id){
               //      return res.status(401).send("Not Allowed")
               // }
               const user = await Users.findById(userId)
               // console.log(user.username)
               const blogs = await Blogs({
                    userId:req.user.id,
                    username:user.username,
                    userImage:user.image,
                    title:req.body.title,
                    description:req.body.description,
                    image:{
                         data:`uploads/',req.file.filename`,
                         contentType:'image/png'
                    }
               })
               await blogs.save()
               res.send({blogs,user})
             }
        })
         
     } catch (error) {
          res.status(400).send({error,error:"Your Blog Not Create"})
     }
})

// existing user update existing your blog
.put('/blogupdate/:id',usertoken,async(req,res)=>{
     try {
          
          upload(req,res,async(err)=>{
               const {title,description} = req.body
               const id  = req.params.id
              if(err)
              {
               throw("Image Error")
              }
              else{
               let blog = await Blogs.findById(id)
               if(!blog){
                   return res.status(404).send("Blog Not Found")
               }
               if(blog.userId.toString()!==req.user.id){
                    return res.status(401).send("Not Allowed")
               }
               blog = await Blogs
               .findByIdAndUpdate(id,{$set:{title,description,image:{
                    data:`uploads/${req.file.filename}`,
                    contentType:"image/png"
               }}},{new:true})
               res.send(blog)
              }
          })
          
     } catch (error) {
          res.send(401).send({error})
     }
})

// existing user,existing your blog delete
.delete('/blogdelete/:id',usertoken,async(req,res)=>{
     try {
          const id  = req.params.id
          let blog = await Blogs.findById(id)
          if(!blog){
              return res.status(404).send("Blog Not Found")
          }
          if(blog.userId.toString()!==req.user.id){
               return res.status(401).send("Not Allowed")
          }
          blog = await Blogs.findByIdAndDelete(id,{new:true})
          res.send(blog)
     } catch (error) {
          res.send(401).send({error})
     }
})
module.exports.routers = router;