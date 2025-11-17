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

// Add Product (Cloudinary)
exports.addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      ratings: req.body.ratings,
      image: req.file.path,      // CLOUDINARY URL
      public_id: req.file.filename,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.error("Error in addProduct:", err.message);
    res.status(500).json({ error: err.message });
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
