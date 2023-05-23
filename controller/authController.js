import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import User from "../models/userModels.js";

const createToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// @desc Signup
// @route GET /api/v1/auth/signup
// @access PUBLIC
export const signup = asyncHandler(async (req, res, next) => {
  // Create user
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  // Generate token   pauload or data - secret key min 32 char - epiression date
  // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
  //   expiresIn: process.env.JWT_EXPIRES_IN,
  // });
   const token =createToken(user._id);

  res.status(201).json({ data: user, token });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("incorrect email or password"));
  }
  // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
  //   expiresIn: process.env.JWT_EXPIRES_IN,
  // });
   const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});
