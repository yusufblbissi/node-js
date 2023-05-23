import subCategory from "../models/subCategoryModels.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import slugify from "slugify";
import { createOne, deleteOne ,updateOne,getOne, getAll} from "./handlersFactory.js";


// @desc GEt list of categories
// @route GET /api/v1/categories
// @access Public
export const getSubCategories = getAll(subCategory)

// @desc GEt list of category by id
// @route GET /api/v1/categories /:id
// @access Public
export const getSubCategory = getOne(subCategory)

//set categoryid into body
export const setCategoryIdToBody = (req, res, next) => {
  //nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc Create Category
// @route POST /api/v1/categories
// @access private
export const createSubCategory = createOne(subCategory)

// @desc Update specific Category
// @route POST /api/v1/categories
// @access private

export const updateSubCategory = updateOne(subCategory);

// @desc Delete specific Category
// @route POST /api/v1/categories/:id
// @access private
export const deleteSubcategory = deleteOne(subCategory)
// export const deleteSubcategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const subcategory = await subCategory.findByIdAndDelete(id);

//   if (!subcategory) {
//     return next(new ApiError(`no category found for this id: ${id}`, 404));
//   }

//   //delete status
//   res.status(204).send();
// });
