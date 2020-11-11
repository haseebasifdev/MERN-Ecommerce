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
exports.upload