const express = require('express');
const {registerUser, loginUser, logoutUser, fortgotPassword, resetPassword, getUserDetails, updatePassword, getAllUser, getSingleUser} = require('../controllers/userController')

const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').get(fortgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser,getUserDetails);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUser)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getSingleUser)
module.exports = router;