const createHttpError = require("http-errors");
const { product } = require("../models/product.model");

async function getProducts(req, res, next) {
  try {
    const result = await product.find({
      name: { $regex: req.query.searchItem, $options: "i" },
    });
    return res.status(200).send({
      result,
    });
  } catch (error) {
    next(createHttpError(400, error.message));
  }
}

module.exports = {
  getProducts,
};
