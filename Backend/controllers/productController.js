const { createNewProduct, getAllProducts, updateProduct, getOneProduct, deleteProductData } = require("../services/productsService")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors =require('../middleware/catchAsyncErrors')
const Product = require("../models/productModel")

/* CREATE PRODUCT CONTROLLER */
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = req.body
    const productData = await createNewProduct(product)

    res.status(201).json({
        success: true,
        productData
    })
})

/* GET PRODUCTS CONTROLLER */
exports.getAllProducts = catchAsyncErrors(async (req,res,next) =>{
    const query = req.query
    const products = await getAllProducts(query)

    res.status(200).json({
        success: true,
        products
    })
})

/* GET ONE PRODUCT CONTROLLER */
exports.getOneProduct = catchAsyncErrors(async (req,res,next) =>{
    const productCount = await Product.countDocuments()
    const id = req.params.id
    const product = await getOneProduct(id)
    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }
    res.status(200).json({
        success:true,
        product,
        productCount
    })
})

/* UPDATE PRODUCT CONTROLLER ADMIN */
exports.updateProduct = catchAsyncErrors(async(req,res,next) =>{
    const productData = req.body
    const id = req.params.id
    const product = await getOneProduct(id)
    if(product){
        const product = await updateProduct(id,productData)
        res.status(200).json({
            success:true,
            product
        })
    }else{
        return next(new ErrorHandler("Product not Found",404))
    }
})

/* DELETE PRODUCT CONTROLLER ADMIN */
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const id = req.params.id
    const product = await deleteProductData(id)
    if(product.deletedCount === 0){
        return next(new ErrorHandler("Product not Found",404))
    }

    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })
})