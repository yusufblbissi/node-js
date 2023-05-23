import { body, check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import slugify from "slugify";
import User from "../../models/userModels.js";
import bcrypt from "bcryptjs";
export const createUserValidator = [
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("User already exists");
      }
      return true; // Return a successful validation
    }),
  check("password")
    .notEmpty()
    .withMessage("pass required")
    .isLength({ min: 6 })
    .withMessage("too short password"),
  check("phone")
    .optional()
    .isMobilePhone("ar-LB")
    .withMessage("Invalid phone number"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("required password confirm")
    .custom((pass, { req }) => {
      if (pass !== req.body.password) {
        throw new Error("password not match");
      }
      return true;
    }),
  validatorMiddleware,
];

export const getUserValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  validatorMiddleware,
];

export const updateUserValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  body("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Invalid email address")
  .custom(async (value, { req }) => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error("Email already exists");
    }
    return true; // Return a successful validation
  }),
  validatorMiddleware,
];

export const changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  body("newPassword")
    .notEmpty()
    .withMessage("You must enter your new password"),
  body("newPasswordConfirm")
    .notEmpty()
    .withMessage("You must enter the confirm new password")
    .custom(async (val, { req }) => {
      // 1- verify current password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("User not found");
      }

      console.log(req.body.currentPassword);
      console.log(user.password);
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Current password is incorrect");
      }
      // 2- verify confirm password
      if (req.body.newPassword !== val) {
        throw new Error("New password and confirm password must match");
      }
      return true;
    }),
  validatorMiddleware,
];
export const deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  validatorMiddleware,
];
