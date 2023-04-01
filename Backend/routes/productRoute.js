const express = require('express')
const { getAllProducts,createProduct, updateProduct, deleteProduct, getOneProduct, createProductReview, getAllReviews, deleteReview } = require('../controllers/productController')
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

/* CREATE NEW REVIEW OR UPDATE THE REVIEW */
router.put('/review', isAuthenticatedUser, createProductReview)

/* GET REVIEWS ROUTE */
router.get('/reviews', getAllReviews)

/* DELETE REVIEW ROUTE */
router.delete('/reviews',isAuthenticatedUser, deleteReview)



module.exports = router