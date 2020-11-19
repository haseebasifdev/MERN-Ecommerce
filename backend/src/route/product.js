const { Router } = require('express')
const express=require('express')
const { requireSignin, adminMiddleware } = require('../commen-middleware')
const { createproduct, getProductBySlug } = require('../controller/product')
const multer=require('multer')
const shortid=require('shortid')
const path=require('path')
// const { addCategory, getCategories } = require('../controller/category')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  const upload =multer({storage})

const router=express.Router()

router.post('/product/create',requireSignin,adminMiddleware, upload.array('productPicture'),createproduct)
router.get('/products/:slug',getProductBySlug)
// router.get('/category/getCategory',getCategories)

module.exports=router

