const { registerNewUser, loginUser, logOut, forgotPassword, resetPassword, getOneUser, updatePassword, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser } = require("../services/userService")
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

exports.getOneUser = catchAsyncErrors(async(req,res,next)=>{
    const id = req.user.id

    const user = await getOneUser(id)

    res.status(200).json({
        success: true,
        user
    })
})

exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const id = req.user.id
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword

    await updatePassword(id,oldPassword,newPassword,confirmPassword,res,next)

})

exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    await updateProfile(req,res)
})

exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    await getAllUsers(res)
})

exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    await getSingleUser(req,res,next)
})

exports.updateRole = catchAsyncErrors(async(req,res,next)=>{
    await updateRole(req,res,next)
})

exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    await deleteUser(req,res,next)
})