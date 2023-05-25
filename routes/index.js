import categoryRoute from "./categoryRoute.js";
import subCategoryRoute from "./subCategoryRoute.js";
import brandRoute from "./brandRoute.js";
import productRoute from "./productRoute.js";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";


// const reviewRoute = require('./reviewRoute');
// const wishlistRoute = require('./wishlistRoute');
// const addressRoute = require('./addressRoute');
// const couponRoute = require('./couponRoute');
// const cartRoute = require('./cartRoute');
// const orderRoute = require('./orderRoute');

export const mountRoutes = (app) => {
    app.use("/api/v1/categories", categoryRoute);
    app.use("/api/v1/subcategories", subCategoryRoute);
    app.use("/api/v1/brands", brandRoute);
    app.use("/api/v1/products", productRoute);
    app.use("/api/v1/users", userRoute);
    app.use("/api/v1/auth", authRoute);

//   app.use('/api/v1/reviews', reviewRoute);
//   app.use('/api/v1/wishlist', wishlistRoute);
//   app.use('/api/v1/addresses', addressRoute);
//   app.use('/api/v1/coupons', couponRoute);
//   app.use('/api/v1/cart', cartRoute);
//   app.use('/api/v1/orders', orderRoute);
};


