const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors =require('../middleware/catchAsyncErrors')
const { newOrder, getSingleOrder, getMyOrders,getAllOrders, updateOrder, deleteOrder } = require("../services/orderService")

/* NEW ORDER */

exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body
    const userId = req.user._id
    
    const order = await newOrder(shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,userId)

    res.status(201).json({
        success:true,
        order
    })
})

/* GET SINGLE ORDER */
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const id = req.params.id

    const order = await getSingleOrder(id,next)

    res.status(200).json({
        success:true,
        order
    })
})

/* GET MY ORDERS */
exports.getMyOrders = catchAsyncErrors(async(req,res,next)=>{
    const id = req.user.id

    const orders = await getMyOrders(id)

    res.status(200).json({
        success:true,
        orders
    })
})

/* GET ALL ORDERS ADMIN */
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    await getAllOrders(res)

})

/* UPDATE ORDER STATUS ADMIN */
exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const id = req.params.id
    const status = req.body.status

    await updateOrder(id,status,next)

    res.status(200).json({
        success:true
    })
})

/* DELETE ORDER ADMIN */
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const id = req.params.id

    await deleteOrder(id,next)

    res.status(200).json({
        success:true
    })
})