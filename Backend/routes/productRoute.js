const express = require('express')
const { getAllProducts,createProduct, updateProduct, deleteProduct, getOneProduct } = require('../controllers/productController')

const router = express.Router()


/* CREATE PRODUCT ROUTE */
router.post('/product/new', createProduct)


/* GET PRODUCTS ROUTE */
router.get('/products', getAllProducts)

/* GET ONE PRODUCT ROUTE */
router.get('/product/:id', getOneProduct)

/* UPDATE PRODUCT ROUTE ADMIN*/
router.put('/product/:id', updateProduct)

/* DELETE PRODUCT ROUTE ADMIN*/
router.delete('/product/:id', deleteProduct)

module.exports = router