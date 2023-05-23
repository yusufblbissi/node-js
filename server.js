import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import ApiError from "./utils/apiError.js";
import globalError from "./middlewares/errorMiddleware.js";
dotenv.config({ path: "config.env" });

// connect database
import dbConnection from "./config/database.js";
import categoryRoute from "./routes/categoryRoute.js";
import subSategoryRoute from "./routes/subCategoryRoute.js";
import brandRoute from "./routes/brandRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
//express app
const app = express();
dbConnection();

// Middlewares
app.use(express.json());

//Development Mode
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
} else {
  console.log(process.env.NODE_ENV);
}

//Routes
// Use the category route middleware
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subSategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Con't find this route ${req.originalUrl}`, 400));
});

//global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("app running");
});

//unhandledRejection out site express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error:${err.name} | ${err.message}`);
  server.close(() => {
    console.error("App Shutting Down....");
    process.exit(1);
  });
});
