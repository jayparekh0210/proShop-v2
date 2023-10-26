const Product = require("../models/productMoel");
const asyncHandler = require("../middlewares/asyncHandeler");

const getAllProducts = asyncHandler(async (req, res) => {
  const data = await Product.find({});
  res.json(data);
});

const getSpecificProduct = asyncHandler(async (req, res) => {
  const data = await Product.findById(req.params.id);
  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

module.exports = { getAllProducts, getSpecificProduct };
