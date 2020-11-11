const express = require('express')
const { requireSignin } = require('../../commen-middleware')
const { signup,signin, signout } = require('../../controller/admin/user')
const { validatSignupeResult, isRequestedValidated ,validateSigninResult} = require('../../validators/user')
const router = express.Router()
// const {sigup,signin} = require('../model/user')
router.post('/admin/signin', validateSigninResult,isRequestedValidated,signin)
router.post('/admin/signup',validatSignupeResult,isRequestedValidated,signup)
router.post('/admin/signout',requireSignin,signout)
module.exports = router