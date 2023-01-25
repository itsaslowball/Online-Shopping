const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");
const {getProducts, getProduct}  = require('../controllers/productController')
const router = express.Router();


//get route for all products
router.route("/products").get(
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
// router.route("/products").get(getProducts);


//get route for single product
router.route("/products/:id").get(
    asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  }));
// router.route("/products/:id").get(getProduct);

module.exports = router;