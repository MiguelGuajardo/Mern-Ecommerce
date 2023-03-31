const { registerNewUser, loginUser, logOut, forgotPassword, resetPassword } = require("../services/userService")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors =require('../middleware/catchAsyncErrors')

exports.registerUser = catchAsyncErrors(async (req,res,next)=>{
    const userData = req.body
    const token = await registerNewUser(userData,res)
    return token
})

exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const userData = req.body
    const token = await loginUser(userData,next,res)
    return token
})

exports.logOut = catchAsyncErrors(async(req,res,next)=>{
    
    await logOut(res)

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })
})

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    await forgotPassword(req,res,next)
})

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    await resetPassword(req,res,next)
})