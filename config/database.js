import mongoose from "mongoose";
const a = 10;

export default async function dbConnection() {
  await mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`Database Connected:${conn.connection.host}`);
  });
  // .catch((err) => {
  //   console.error(`Database Error:${err}`);
  //   process.exit(1);
  // });
}
