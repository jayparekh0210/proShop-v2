const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products");
const Product = require("./models/productMoel");
const Order = require("./models/orderModel");
const User = require("./models/userModel");
const connectDB = require("./config/db");

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduct);
    console.log("Data Imported In Data base".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Data Not Imported: ${error} `.red.inverse);
  }
};

const deleteDatabase = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
  } catch (error) {}
};

if (process.argv[2] === "-d") {
  deleteDatabase();
} else {
  importData();
}
