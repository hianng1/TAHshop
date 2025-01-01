import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizedAdmin, createCategory);
router.route("/:categoryID").put(authenticate, authorizedAdmin, updateCategory);
router
  .route("/:categoryID")
  .delete(authenticate, authorizedAdmin, deleteCategory);
router.route("/categories").get(listCategory);
router.route('/:id').get(readCategory)
export default router;
