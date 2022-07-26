import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const Connection = async (URL) => {

  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};



export default Connection;
