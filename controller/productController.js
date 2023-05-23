import Product from "../models/productModels.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import slugify from "slugify";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { deleteOne, updateOne,createOne, getOne, getAll } from "./handlersFactory.js";

// @desc GEt list of categories
// @route GET /api/v1/categories
// @access Public
export const getProducts = getAll(Product,"Product")
// @desc GEt list of product by id
// @route GET /api/v1/categories /:id
// @access public
export const getProduct = getOne(Product)

// @desc Create Product
// @route POST /api/v1/categories
// @access private
export const createProduct = createOne(Product)

// @desc Update specific Product
// @route POST /api/v1/categories
// @access private

export const updateProduct = updateOne(Product);
// @desc Delete specific Product
// @route POST /api/v1/categories/:id
// @access private
export const deleteProduct = deleteOne(Product)
// export const deleteProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const product = await Product.findByIdAndDelete(id);

//   if (!product) {
//     return next(new ApiError(`no product found for this id: ${id}`, 404));
//   }
//   //delete status
//   res.status(204).send();
// });
