import express from "express";
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
import {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/validator/validatorProduct.js";
import bodyParser from "body-parser";
// import subproductsRoute from './subProductRoute.js'
//nested route
const router = express.Router();
router.use(bodyParser.json());
//nested route
// router.use("/:categoryId/product",subproductsRoute)
//get and post on same path
router.route("/").get(getProducts).post(createProductValidator,createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
