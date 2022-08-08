import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

// connect to mongodb database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.log(err.message));

const app = express();

// seed the database with data
app.use("/api/seed", seedRouter);

// get all products from the database and send them back to the front-end
app.use("/api/products", productRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
