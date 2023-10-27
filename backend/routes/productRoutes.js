const Express = require("express");
const {
  getAllProducts,
  getSpecificProduct,
} = require("../controllers/productController");

const productRouter = Express.Router();

productRouter.route("/").get(getAllProducts);
productRouter.route("/:id").get(getSpecificProduct);

module.exports = productRouter;
