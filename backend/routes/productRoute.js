const express = require('express');
const { getAllProducts, createProduct, updateProduct, getProductDetails, deleteProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get( getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct);
router.route("/admin/product/:id").get(getProductDetails);
router.route("product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct);


module.exports = router;  