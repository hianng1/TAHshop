// import React from 'react'
import express from "express";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js";
import {
  addProduct,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProduct,
  fetchNewProduct
} from "../controllers/productController.js";
const router = express.Router();
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizedAdmin, formidable(), addProduct);

router.get("/top", fetchTopProduct);
router.route("/allproducts").get(fetchAllProducts);
router.get('/new', fetchNewProduct)
router
  .route("/:id/reviews")
  .post(authenticate, authorizedAdmin, checkId, addProductReview);
router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizedAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizedAdmin, removeProduct);

export default router;
