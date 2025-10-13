// const Product = require('../models/Product');

// // Add Product
// exports.addProduct = async (req, res) => {
//   try {
//     const { image, title, price, description, ratings } = req.body;

//     if (!image || !title || !price || !description || ratings == null) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const newProduct = new Product({ image, title, price, description, ratings });
//     await newProduct.save();

//     res.status(201).json({ message: 'Product added successfully', product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong', error: error.message });
//   }
// };

// // Get All Products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Unable to fetch products', error: error.message });
//   }
// };

const Product = require('../models/Product');

// Add Product with image
exports.addProduct = async (req, res) => {
  try {
    const { title, price, description, ratings } = req.body;
    const image = req.file?.path;

    if (!image || !title || !price || !description || ratings == null) {
      return res.status(400).json({ message: 'All fields including image are required' });
    }

    const newProduct = new Product({ image, title, price, description, ratings });
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products', error: error.message });
  }
};
