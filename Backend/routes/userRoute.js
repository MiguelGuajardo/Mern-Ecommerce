const express = require('express')
const { registerUser, loginUser, logOut, forgotPassword, resetPassword, getOneUser, updatePassword, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser } = require('../controllers/userController')
const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth')

const router = express.Router()
router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/password/forgot', forgotPassword)

router.put('/password/reset/:token', resetPassword)

router.get('/logout', logOut)

router.get('/me',isAuthenticatedUser, getOneUser)

router.put('/password/update', isAuthenticatedUser, updatePassword)

router.put('/me/update', isAuthenticatedUser, updateProfile)

router.get('/admin/users',isAuthenticatedUser,authorizeRoles("admin"), getAllUsers)

router.get('/admin/user/:id',isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)

router.put('/admin/user/:id',isAuthenticatedUser,authorizeRoles("admin"),updateRole)

router.delete('/admin/user/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteUser)

module.exports = router