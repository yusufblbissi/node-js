import express from "express";
import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deletecategory,
} from "../controller/categoryController.js";
import { getCategoryValidator,updateCategoryValidator,deleteCategoryValidator } from "../utils/validator/validatorCategory.js";
import bodyParser from "body-parser";
import subCategoriesRoute from './subCategoryRoute.js'
//nested route
const router = express.Router();
router.use(bodyParser.json());
//nested route
router.use("/:categoryId/subcategories",subCategoriesRoute)
//get and post on same path
router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategoryValidator,
    getCategory
  )
  .put(updateCategoryValidator,updateCategory)
  .delete(deleteCategoryValidator,deletecategory);

export default router;
