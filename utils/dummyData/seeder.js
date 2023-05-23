import fs from "fs";
import dotenv from "dotenv";
import product from "../../models/productModels.js";
import dbConnection from "../../config/database.js";
// import { Color } from "colors/index.js";
import colors from 'colors';

dotenv.config({ path: "../../config.env" });
dbConnection();
// Read Data
const products = JSON.parse(fs.readFileSync("./products.json"));

const insertData = async () => {
  try {
    await product.create(products);
    // console.log("Data Inserted".green.inserve);
    console.log(colors.green("Data Inserted"));
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const distroyData = async () => {
  try {
    await product.deleteMany();
    console.log(colors.red("Data deleted"));

    // console.log("Data Destroyed".red.inserve);
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == "-i") {
  insertData();
} else if (process.argv[2] == "-d") {
  distroyData();
}
