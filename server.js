import express from "express";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'));
}


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});

const URL =
  process.env.DB_URL ||
  "mongodb+srv://tushar:tushar123@cluster0.vgq2d.mongodb.net/?retryWrites=true&w=majority";

Connection(URL);
