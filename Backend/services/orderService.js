const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')

const newOrder = async(shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,userId)=>{

    const order = await Order.create({shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paidAt:Date.now(),user:userId})

    return order
}

const getSingleOrder = async(id,next)=>{
    const order = await Order.findById(id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }

    return order
}

const getMyOrders = async(id)=>{
    const orders = await Order.find({user: id}).populate("user","name email")

    return orders
}

const getAllOrders = async(res)=>{
    const orders = await Order.find({})

    let totalAmount = 0

    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
}

const updateOrder = async(id,status,next)=>{
    const order = await Order.findById(id)

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400))
    }

    order.orderItems.forEach(async (order) =>{
        await updateStock(order.product,order.quantity)
    })
    
    order.orderStatus = status

    if(status === "Delivered"){
        order.deliveredAt = Date.now()
    }
    
    await order.save({validateBeforeSave: false})
    
}

const updateStock = async(id,quantity)=>{
    const product = await Product.findById(id.toString())

    product.stock -= quantity

    await product.save({validateBeforeSave: false})
}

const deleteOrder = async(id,next)=>{
    const order = await Order.findById(id)

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404))
    }

    await Order.deleteOne(order)
}

module.exports = {
    newOrder,
    getSingleOrder,
    getMyOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
}