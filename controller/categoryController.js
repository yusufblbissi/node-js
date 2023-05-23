import Category from "../models/categoryModels.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import slugify from "slugify";
import {deleteOne,updateOne,createOne,getOne,getAll} from './handlersFactory.js'
import Brand from "../models/brandModels.js";

// @desc GEt list of categories
// @route GET /api/v1/categories
// @access Public
export const getCategories = getAll(Category)

// @desc GEt list of category by id
// @route GET /api/v1/categories /:id
// @access Public
export const getCategory = getOne(Category)

// @desc Create Category
// @route POST /api/v1/categories
// @access private
export const createCategory = createOne(Category)

// @desc Update specific Category
// @route POST /api/v1/categories
// @access private

export const updateCategory = updateOne(Category);

// @desc Delete specific Category
// @route POST /api/v1/categories/:id
// @access private
export const deletecategory = deleteOne(Category)