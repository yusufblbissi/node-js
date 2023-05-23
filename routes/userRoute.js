import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} from "../controller/userController.js";
 import {createUserValidator, getUserValidator,updateUserValidator,deleteUserValidator,changePasswordValidator } from "../utils/validator/validatorUser.js";
// import subUserRoute from './subUserRoute.js'
//nested route
const router = express.Router();
router.put("/changePassword/:id",changePasswordValidator, changeUserPassword);
//nested route
// router.use("/:brandId/subcategories",subCategoriesRoute)
//get and post on same path
router.route("/").get(getUsers).post(createUserValidator,createUser);
router
  .route("/:id")
  .get(
    getUser
  )
  .put(updateUserValidator,updateUser)
  .delete(deleteUser);

export default router;
