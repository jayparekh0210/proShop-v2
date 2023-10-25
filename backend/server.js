const Express = require("express");
const products = require("./data/products");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const productRpute = require("./routes/productRoutes");

const { notFound, errorHandler } = require("./middlewares/errorHandeler");
dotenv.config();

connectDB();

const app = Express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is Running....");
});

app.use("/api/products", productRpute);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is Running on PORT:" + PORT);
});
