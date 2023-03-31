const Product = require('../models/productModel')

/* CREATE PRODUCT SERVICE */
const createNewProduct = async(product)=>{
    const products = await Product.create(product)
    return products
}

/* GET PRODUCTS SERVICE */
const getAllProducts = async() =>{
    const products = await Product.find()
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



module.exports = {
    createNewProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProductData
}