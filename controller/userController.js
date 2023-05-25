import User from "../models/userModels.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs'
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";

// @desc GEt list of brands
// @route GET /api/v1/brands
// @access Private
export const getUsers = getAll(User);
// @desc GEt list of brand by id
// @route GET /api/v1/brands /:id
// @access Private
export const getUser = getOne(User);

// @desc Create Brand
// @route POST /api/v1/brands
// @access Private
export const createUser = createOne(User);

// @desc Update specific Brand
// @route POST /api/v1/brands
// @access Private

// export const updateUser = updateOne(User);
export const updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
export const changeUserPassword = asyncHandler(async (req, res, next) => {

  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.currentPassword,12),
      passwordChangedAt:Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc Delete specific Brand
// @route POST /api/v1/brands/:id
// @access private
export const deleteUser = deleteOne(User);
// export const deleteBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const brand = await Brand.findByIdAndDelete(id);

//   if (!brand) {
//     return next(new ApiError(`no brand found for this id: ${id}`, 404));
//   }

//   //delete status
//   res.status(204).send();
// });
