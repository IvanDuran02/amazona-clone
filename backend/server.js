import express from "express";
import data from "./data.js"; // data is copied from the front-end

const app = express();

// when user goes to this address we return products to the front-end user
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
