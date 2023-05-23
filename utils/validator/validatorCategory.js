import { check ,body} from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import slugify from "slugify";
export const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  validatorMiddleware,
];

export const createCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Category required")
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

export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];
export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalide category id format"),
  validatorMiddleware,
];
