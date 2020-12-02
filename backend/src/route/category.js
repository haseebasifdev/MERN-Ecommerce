const { Router } = require('express')
const express=require('express')
const { requireSignin, adminMiddleware } = require('../commen-middleware')
const { addCategory, getCategories ,updateCategory} = require('../controller/category')
// const upload=require('../imageuploader/index')
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

// router.post('/category/create',requireSignin,adminMiddleware ,upload.single('categoryImage'),addCategory)
router.post('/category/create',requireSignin,adminMiddleware ,upload.single('categoryImage'),addCategory)
router.post('/categories/update',requireSignin,adminMiddleware ,upload.array('categoryImage'),updateCategory)
router.get('/category/getCategory',getCategories)

module.exports=router

// "name": "Mobiles",
//     "parentId":"5f919e34ac4ebf1928ab43bd"
