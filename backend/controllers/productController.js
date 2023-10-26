const Product = require("../models/product");
const dbConnect = require("../config/db");
const newProduct = async (req, res) => {
  try {
    console.log(req.body);
    // let product = await Product.create(req.body);
    return res.status(200).send("Product created");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    let products = await Product.find({});

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

module.exports = { newProduct, getAll };
