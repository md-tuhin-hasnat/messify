const express = require("express");
const checkAuth = require("../checkAuth");
const { getProducts } = require("../controllers/products.control");
const productRouter = express.Router();

productRouter.get("/get-product", checkAuth, getProducts);

module.exports = productRouter;
