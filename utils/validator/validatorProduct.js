import { check, body } from "express-validator";
import Category from "../../models/categoryModels.js";
import subCategory from "../../models/subCategoryModels.js";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const getProductValidator = [
  check("id").isMongoId().withMessage("Invalideproduct id format"),
  validatorMiddleware,
];

export const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title product required")
    .isLength({ min: 3 })
    .withMessage("must be at least 4 chars"),
  check("description")
    .notEmpty()
    .withMessage("description must be not empty")
    .isLength({ max: 2000 })
    .withMessage("Too long product description"),
  check("quantity")
    .notEmpty()
    .withMessage("Quantity required")
    .isNumeric()
    .withMessage("Number quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Sold quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Price required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isLength({ max: 20 })
    .withMessage("Too product price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("discount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("Discount must be greater than price");
      }
      return true;
    })
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("colors").optional().isArray().withMessage("Color must be an array"),
  check("imageCover").notEmpty().withMessage("Cover is requires"),
  check("images").optional().isArray().withMessage("Images must be an array"),
  check("category")
    .notEmpty()
    .withMessage("The product must belong to a category ")
    .isMongoId()
    .withMessage("Category must be a mongo id")
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) {
        return Promise.reject(new Error(`Category not found ${categoryId}`));
      }
    }),
  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("product must be a mongo id")
    .custom((subCategoriesId) => {
      return subCategory
        .find({ _id: { $exists: true, $in: subCategoriesId } })
        .then((result) => {
          if (result.length < 1 || result.length != subCategoriesId.length) {
            return Promise.reject(new Error(`Invalid subCategories Id `));
          }
        });
    })
    .custom((val, { req }) => {
      return subCategory
        .find({ category: req.body.category })
        .then((subCategories) => {
          const subcategoryids = [];
          subCategories.forEach((subcategory) => {
            subcategoryids.push(subcategory._id.toString());
          });
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subcategoryids)) {
            return Promise.reject(
              new Error(`subCategories id not belong to category `)
            );
          }
        });
    }),
  check("brand").optional().isMongoId().withMessage("Brand must be a mongo id"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Must be a number")
    .isLength({ min: 1 })
    .withMessage("min average 1")
    .isLength({ max: 5 })
    .withMessage("max average 5"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Must be a number"),

  validatorMiddleware,
];

export const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalideproduct id format"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("discount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("Discount must be greater than price");
      }
      return true;
    }),

  check("category")
    .notEmpty()
    .withMessage("The product must belong to a category ")
    .isMongoId()
    .withMessage("Category must be a mongo id")
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) {
        return Promise.reject(new Error(`Category not found ${categoryId}`));
      }
    }),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
export const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalideproduct id format"),
  validatorMiddleware,
];
