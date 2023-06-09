import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import ApiError from "./utils/apiError.js";
import globalError from "./middlewares/errorMiddleware.js";

// You should use the file config before connect to db
dotenv.config({ path: "config.env" });

// connect database
import dbConnection from "./config/database.js";

// Routes
import {mountRoutes} from "./routes/index.js";

//secure
import rateLimit from 'express-rate-limit'
import hpp from "hpp"
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean"
//express app
const app = express();
dbConnection();

// Middlewares
app.use(express.json({limit: '20kb'}));

//Development Mode
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
} else {
  console.log(process.env.NODE_ENV);
}
//rate limit

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message:
		'Too many accounts created from this IP, please try again after an hour',
})

// wishlist for accept duplicate params
app.use(hpp({whitelist:['price']}))

// sanitize data for attack hacker
app.use(ExpressMongoSanitize())
app.use(xss())

// Apply the rate limiting middleware to all requests
app.use('/api',limiter)


// Mont Routes (All Routes)
mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`Con't find this route ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("app running");
});

// UnhandledRejection out site express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error:${err.name} | ${err.message}`);
  server.close(() => {
    console.error("App Shutting Down....");
    process.exit(1);
  });
});
