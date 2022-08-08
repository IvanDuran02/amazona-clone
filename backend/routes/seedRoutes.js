import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.remove({}); // remove all products (empty brackets sends all products)
  const createdProducts = await Product.insertMany(data.products); // inserts products from our static data.js file

  await User.remove({});
  const createdUsers = await User.insertMany(data.users);

  res.send({ createdProducts, createdUsers }); // sends back the products that were created
});

export default seedRouter;
