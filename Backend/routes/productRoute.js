const express = require('express')
const { getAllProducts,createProduct, updateProduct, deleteProduct, getOneProduct } = require('../controllers/productController')
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth')

const router = express.Router()


/* CREATE PRODUCT ROUTE ADMIN */
router.post('/product/new',isAuthenticatedUser, createProduct)


/* GET PRODUCTS ROUTE */
router.get('/products', getAllProducts)

/* GET ONE PRODUCT ROUTE */
router.get('/product/:id', getOneProduct)

/* UPDATE PRODUCT ROUTE ADMIN*/
router.put('/product/:id',isAuthenticatedUser,authorizeRoles('admin'), updateProduct)

/* DELETE PRODUCT ROUTE ADMIN*/
router.delete('/product/:id',isAuthenticatedUser,authorizeRoles('admin'), deleteProduct)

module.exports = router