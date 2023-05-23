import express from "express";
import {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} from "../controller/brandController.js";
import { getBrandValidator,updateBrandValidator,deleteBrandValidator } from "../utils/validator/validatorBrand.js";
import bodyParser from "body-parser";
// import subBrandRoute from './subBrandRoute.js'
//nested route
const router = express.Router();
router.use(bodyParser.json());
//nested route
// router.use("/:brandId/subcategories",subCategoriesRoute)
//get and post on same path
router.route("/").get(getBrands).post(createBrand);
router
  .route("/:id")
  .get(getBrandValidator,
    getBrand
  )
  .put(updateBrandValidator,updateBrand)
  .delete(deleteBrandValidator,deleteBrand);

export default router;
