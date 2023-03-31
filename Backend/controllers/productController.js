const { createNewProduct, getAllProducts, updateProduct, getOneProduct, deleteProductData } = require("../services/productsService")

/* CREATE PRODUCT CONTROLLER */
exports.createProduct = async (req,res,next)=>{
    const product = req.body
    const productData = await createNewProduct(product)

    res.status(201).json({
        success: true,
        productData
    })
}

/* GET PRODUCTS CONTROLLER */
exports.getAllProducts = async (req,res,next) =>{
    const products = await getAllProducts()

    res.status(200).json({
        success: true,
        products
    })
}
/* GET PRODUCT CONTROLLER */
exports.getOneProduct = async (req,res,next) =>{
    const id = req.params.id
    const product = await getOneProduct(id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        })
    }
    res.status(200).json({
        success:true,
        product
    })
}

/* UPDATE PRODUCT CONTROLLER ADMIN */
exports.updateProduct = async(req,res,next) =>{
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
        res.status(500).json({
            success:false,
            message:"Product not Found"
        })
    }
}

/* DELETE PRODUCT CONTROLLER ADMIN */
exports.deleteProduct = async(req,res,next)=>{
    const id = req.params.id
    const product = await deleteProductData(id)
    if(product.deletedCount === 0){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        })
    }

    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })
}