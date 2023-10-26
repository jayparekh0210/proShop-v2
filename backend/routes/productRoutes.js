const Express = require("express");
const {
  getAllProducts,
  getSpecificProduct,
} = require("../controllers/productController");
const Product = require("../models/productMoel");

const asyncHandler = require("../middlewares/asyncHandeler");

const productRouter = Express.Router();

productRouter.route("/").get(getAllProducts);
productRouter.route("/:id").get(getSpecificProduct);

module.exports = productRouter;
