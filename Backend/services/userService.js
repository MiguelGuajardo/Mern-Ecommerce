const User = require('../models/userModel')
const { propfind } = require('../routes/userRoute')
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

const getOneUser = async(id)=>{
    const user = await User.findById(id)
    
    return user
}

const updatePassword = async(id,oldPassword,newPassword,confirmPassword,res,next)=>{
    const user = await User.findById(id).select("+password")

    const isPasswordMatched = await user.comparePassword(oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",401))
    }

    if(newPassword !== confirmPassword){
        return next(new ErrorHandler("Password does not match",400))
    }

    user.password = newPassword

    await user.save()
    
    sendToken(user,200,res)
}

/* UPDATE USER PROFILE */
const updateProfile = async(req,res)=>{
    const {name, email} = req.body
    const {id} = req.user

    if(name === undefined || email === undefined){
        res.status(500).json({
            success:true,
            message:"Validation failed: Please enter name or email"
        })
    }
    
    const newUserData = {
        name: name,
        email: email
    }

    
    const user = await User.findByIdAndUpdate(id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true,
        user
    })
}

/* GET ALL USERS (ADMIN) */
const getAllUsers = async(res)=>{
    const users = await User.find()

    res.status(200).json({
        success:true,
        users
    })
}
/* GET SINGLE USER (ADMIN) */
const getSingleUser = async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
}
/* UPDATE USER ROLE ADMIN*/
const updateRole = async(req,res,next)=>{
    const {name, email,role} = req.body
    const id = req.params.id
    
    const newUserData = {
        name: name,
        email: email,
        role: role
    }

    
    const user = await User.findByIdAndUpdate(id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
}

/* DELETE USER ADMIN*/
const deleteUser = async(req,res,next)=>{
    const id = req.params.id
    
    const user = await User.findById(id)

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${id}`))
    }

    await User.deleteOne(user)

    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
}

module.exports ={
    registerNewUser,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    getOneUser,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateRole,
    deleteUser
}