const express = require('express')
const { signup,signin } = require('../controller/user')
const  {validatSignupeResult, isRequestedValidated,validateSigninResult}=require('../validators/user')
const router = express.Router()
// const {sigup,signin} = require('../model/user')
router.post('/signin',validateSigninResult,isRequestedValidated,signin)
router.post('/signup',validatSignupeResult,isRequestedValidated,signup)
// router.post('/profile', requireSignin,(req,res)=>{
//     res.status(200).json({user:'profile'})
// })
module.exports = router