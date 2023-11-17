const jwt = require('jsonwebtoken')
const JWT_SECURITY = "@nil|kantariya@#$%!!";
const usertoken = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
     res.status(401).send({error:"Pleace authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECURITY)
        // console.log(data.user)
        req.user = data.user
        next()
    } catch (error) {
        res.send(error)
    }   

}

module.exports = usertoken;