import Brand from "../models/brandModels.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import slugify from "slugify";
import {deleteOne,updateOne,createOne,getOne,getAll} from './handlersFactory.js'

// @desc GEt list of brands
// @route GET /api/v1/brands
// @access Public
export const getBrands = getAll(Brand)
// @desc GEt list of brand by id
// @route GET /api/v1/brands /:id
// @access Public
export const getBrand = getOne(Brand)

// @desc Create Brand
// @route POST /api/v1/brands
// @access private
export const createBrand = createOne(Brand)

// @desc Update specific Brand
// @route POST /api/v1/brands
// @access private

export const updateBrand = updateOne(Brand);

// @desc Delete specific Brand
// @route POST /api/v1/brands/:id
// @access private
export const deleteBrand = deleteOne(Brand);
// export const deleteBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const brand = await Brand.findByIdAndDelete(id);

//   if (!brand) {
//     return next(new ApiError(`no brand found for this id: ${id}`, 404));
//   }

//   //delete status
//   res.status(204).send();
// });
