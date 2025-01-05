// import React from 'react'
import express from "express"
import formidable from "express-formidable"
import checkId from '../middlewares/checkId.js'
import { addProduct ,updateProduct ,removeProduct, fetchProducts} from "../controllers/productController.js";
const router = express.Router();
import {authenticate, authorizedAdmin} from '../middlewares/authMiddleware.js'


router.route('/')
.get(fetchProducts)
.post(authenticate, authorizedAdmin, formidable(), addProduct)


router.route('/:id')
.put(authenticate, authorizedAdmin, formidable(), updateProduct)
.delete(authenticate, authorizedAdmin, removeProduct)

export default router;