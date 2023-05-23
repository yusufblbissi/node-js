import { body, check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import slugify from "slugify";
export const getBrandValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  validatorMiddleware,
];

export const createBrandValidator = [
  check("id")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
    body("name").custom((val,{req})=>{
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];
export const deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  validatorMiddleware,
];
