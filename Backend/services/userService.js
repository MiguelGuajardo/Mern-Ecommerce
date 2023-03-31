const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

/* REGISTER USER SERVICE */
const registerNewUser = async(userData,res)=>{
    const {name,email,password} = userData
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilePictureUrl"
        }
    })

    sendToken(user,201,res)
}
const loginUser = async(userData,next,res)=>{
    const {email,password} = userData

    /* Checking if user has given password and email both */
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }
    const user = await User.findOne({email:email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    sendToken(user,200,res)
}

const logOut = async (res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });
}

const forgotPassword = async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    /* GET RESETPASSWORD TOKEN */
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`

    try {
        
        await sendEmail({
            email:user.email,
            subject:`Mern-Ecommerce Password Recovery`,
            message: message

        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false})

        return next(new ErrorHandler(error.message,500))
    }
}

const resetPassword = async(req,res,next) =>{

    /* CREATING TOKEN HASH */
    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not password",400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user,200,res)
}

module.exports ={
    registerNewUser,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword
}