import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

// connect to mongodb database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.log(err.message));

const app = express();

// the form data(sent from a post request) is sent as a string, so we need to parse it
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// seed the database with data
app.use("/api/seed", seedRouter);

// get all products from the database and send them back to the front-end
app.use("/api/products", productRouter);

app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  // error handling middleware
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
