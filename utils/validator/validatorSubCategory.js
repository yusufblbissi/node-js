import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  validatorMiddleware,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("empty category id")
    .isMongoId()
    .withMessage("Invalid Category Id form"),

  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalide subCategory id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];
export const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalide subCategory id format"),
  validatorMiddleware,
];
