import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose
  .connect(
    process.env.DB_CONNECT,
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connected to Database and Listening to Localhost through 5000")
  )
  .catch((err) => console.log(err));
