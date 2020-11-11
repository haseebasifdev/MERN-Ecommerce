const { Router } = require('express')
const express=require('express')
const { requireSignin, userMiddleware } = require('../commen-middleware')
const { addItemToCart, } = require('../controller/cart')

const router=express.Router()

router.post('/user/cart/addtocart',requireSignin,userMiddleware ,addItemToCart)

module.exports=router

