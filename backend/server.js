import e from "express";
import express from "express";
import data from "./data.js"; // data is copied from the front-end

const app = express();

// when user goes to this address we return products to the front-end user
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/slug/:slug", (req, res) => {
  // returns product information based on the slug of the product.
  // by adding :slug we can grab the slug that the user entered
  const product = data.products.find((x) => x.slug === req.params.slug); // finds products with requested slug
  if (product) {
    // if they exsist send product
    res.send(product);
  } else {
    // else send an error message.
    res.status(404).send({ message: "Product Not Found" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
