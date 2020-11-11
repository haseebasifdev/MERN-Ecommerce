const { check, validationResult }=require('express-validator')
exports.validatSignupeResult=[
    check('firstName')
    .notEmpty()
    .withMessage('First name is required'),
    check('lastName')
    .notEmpty()
    .withMessage('Last Name is required'),
    check('email')
    .isEmail()
    .withMessage('Email is Required'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be atleast 6 characters')
],
exports.validateSigninResult=[
    check('email')
    .isEmail()
    .withMessage('Email is Required'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be atleast 6 characters')
],
exports.isRequestedValidated=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.array().length>0)
    {
        return res.status(400).json({error:errors.array()})
    }
    next();
}