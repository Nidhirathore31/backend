const mongoose = require("mongoose");
const Cart = require("../models/Carts");

exports.addToCart = async (req, res) => {
  const { productId, name, price, quantity } = req.body;
  const userId = req.user.id; // Extract userId from req.user (set by middleware)

  if (!userId || !productId || !name || !price || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

exports.getCart = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);

  try {
    const cartData = await Cart.aggregate([
      {
        $match: { user: userId }
      },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products", // must match actual MongoDB collection name (usually lowercase plural)
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          productId: "$items.productId",
          quantity: "$items.quantity",
          name: "$productDetails.title",
          image: "$productDetails.image",
          price: "$productDetails.price",
          total: {
            $multiply: ["$items.quantity", "$productDetails.price"]
          }
        }
      }
    ]);

    res.status(200).json({ items: cartData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};
