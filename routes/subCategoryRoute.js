import express from "express";
import {
  getSubCategories,
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubcategory,
  setCategoryIdToBody,
} from "../controller/subCategoryController.js";
import {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} from "../utils/validator/validatorSubCategory.js";
import bodyParser from "body-parser";

const router = express.Router({ mergeParams: true });
//router.use(bodyParser.json());

//get and post on same path
router
  .route("/")
  .get(getSubCategories)
  .post(setCategoryIdToBody , createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubcategory);

export default router;
