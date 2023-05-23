import mongoose from "mongoose";

// 1- Create Schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      trim: true, // for delete space in start and end title
      unique: [true, "subCategory must be unique"],
      minlength: [2, "Too short subCategory name"],
      maxlength: [32, "Too long subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subcategory must be belong to parent"],
    },
  },
  { timestamps: true }
);

// 2- creale model
const subCategory = mongoose.model("SubCategory", subCategorySchema);

export default subCategory;
