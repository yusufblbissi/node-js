import mongoose from "mongoose";
// 1- Create Schema
const productSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "product required"],
        trim: true, // for delete space in start and end title
        minlength: [3, "Too short product name"],
        maxlength: [100, "Too long product name"],
      },
      slug: {
        type: String,
        required: true,
        lowercase: true,
      },
      description:{
        type:String,
        required:true,
        minlength: [20, "Too short product description"],
      },
      quantity:{
        type:Number,
        required:[true,'Product quantity is required'],
      },
      sold:{
        type:Number,
        default:0,
      },
      price:{
        type:Number,
        required:[true,'Product price is required'],
        max:[200000,'Too product price'],
        trim:true,

      },
      priceAfterDiscount:{
        type:Number,
      },
      colors:{
        type:[String],
      },
      imageCover: {
        type: String,
        required: [true,'Image cover is required'],
        
      },
      images:[String],
      category:{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required:[true,'Product must be belong to category']
      },
      subCategories:[{
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory",
        // required:[true,'Product must be belong to subcategory']
      }],
      brand:{
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
      },
      ratingsAverage:{
        type:Number,
        min:[1,'Rating must be above or equal one'],
        max:[5,'Rating must be below or equal five']
      },
      ratingsQuantiry:{
        type:Number,
        default:0,
      }

     
    },
    { timestamps: true }
  );
  // 1- product midleware for select name for category
  productSchema.pre(/^find/,  function (next) {
     this.populate({
      path:'category',
      select : 'name -_id'
     })
    next();
  });
  
  // 2- creale model
  const product = mongoose.model("Product", productSchema);
  
  export default product;
  