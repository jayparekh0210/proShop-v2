const Express = require("express");
const Product = require("../models/productMoel");
const mongoose = require("mongoose");
const asyncHandler = require("../middlewares/asyncHandeler");

const productRouter = Express.Router();

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await Product.find({});
    res.json(data);
  })
);

productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = await Product.findById(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

module.exports = productRouter;
