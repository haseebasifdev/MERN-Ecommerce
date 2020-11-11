const jwt=require('jsonwebtoken')
const { use } = require('../route/user')
exports.requireSignin=(req,res,next)=>{
    if(req.headers.authorization)
    {

        const token=req.headers.authorization.split(" ")[1]
        const user=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=user 
        console.log(user)
        
    
    }
    else{
        return res.status(400).json({message:'Authorization required'})
    }
    next()
}
exports.userMiddleware=(req,res,next)=>{
    if(req.user.role!='user')
    {
        res.status(400).json({message:"User Access Denied"})
    }
    next();
}
exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role!='admin')
    {
        res.status(400).json({message:"Admin Access Denied"})
    }
    next();
}