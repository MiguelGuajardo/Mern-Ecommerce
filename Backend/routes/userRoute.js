const express = require('express')
const { registerUser, loginUser, logOut, forgotPassword, resetPassword } = require('../controllers/userController')

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/password/forgot', forgotPassword)

router.put('/password/reset/:token', resetPassword)

router.get('/logout', logOut)

module.exports = router