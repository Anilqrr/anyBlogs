const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const userRouter = require('./router/auth')
const blogRouter = require('./router/blog')
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use(body_parser.urlencoded({extended:false}))
main().catch(()=>console.log("Server Error!"))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/anyblog')
    console.log('Server Connected!')
}
app.use('/user', userRouter.routers)
app.use('/blog',blogRouter.routers)


app.listen(port, () => console.log(`anyBlogs Backend Run at port ${port}!`))