const Product = require('../models/productModel')
const ApiFeatures = require('../utils/apiFeatures')
const ErrorHandler = require('../utils/errorHandler')

/* CREATE PRODUCT SERVICE */
const createNewProduct = async(req)=>{
    req.body.user = req.user.id
    let product = req.body

    const products = await Product.create(product)
    return products
}

/* GET PRODUCTS SERVICE */
const getAllProducts = async(query) =>{

    const resultPerPage = 5
    
    const apiFeatures = new ApiFeatures(Product.find(),query).search().filter().pagination(resultPerPage)
    
    const products = await apiFeatures.query
    return products
}

/* GET ONE PRODUCT SERVICE */
const getOneProduct = async(id) =>{
    let product = await Product.findById(id)
    return product
}
/* UPDATE PRODUCT SERVICE ADMIN */
const updateProduct = async(id,productData) =>{
    let product = await Product.findByIdAndUpdate(id,productData,{new:true,runValidators:true,useFindAndModify:true})
    return product
}

/* DELETE PRODUCT SERVICE ADMIN */
const deleteProductData = async(id) =>{
    let product = await Product.findById(id)
    return await Product.deleteOne(product)
}

/* CREATE NEW REVIEW OR UPDATE THE REVIEW */
const createProductReview = async(rating,comment,productId,_id,name,res)=>{

    const review = {
        user: _id,
        name: name,
        rating: Number(rating),
        comment: comment,
    }
    const product = await Product.findById(productId)
    
    const isReviewed = product.reviews.find(rev => rev.user === _id)


    if(isReviewed){
        product.reviews.forEach(rev => {

            if(rev.user === _id)
            (rev.rating=rating),
            (rev.comment=comment)
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let num = 0
    product.reviews.forEach((rev) =>{
        num+=rev.rating
    })

    product.ratings = num / product.reviews.length

    await product.save({validateBeforeSave:false,})

    res.status(200).json({
        success:true
    })
}

/* GET ALL REVIEWS */
const getAllReviews = async(id,next)=>{
    const product = await Product.findById(id)

    if(!product){
        return(next(new ErrorHandler("Product not found",404)))
    }

    return product
    
}

/* DELETE REVIEWS */
const deleteReview = async(req,res,next)=>{

    const id = req.query.id
    const productId = req.query.productId

    const product = await Product.findById(productId)
    
    if(!product){
        return(next(new ErrorHandler("Product not found",404)))
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== id)

    let num = 0
    reviews.forEach((rev) =>{
        num+=rev.rating
    })

    const ratings = num / reviews.length

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(productId,{
        reviews,
        ratings,
        numOfReviews,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true
    })
}


module.exports = {
    createNewProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProductData,
    createProductReview,
    getAllReviews,
    deleteReview
}