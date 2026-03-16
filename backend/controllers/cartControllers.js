const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (product.stock !== undefined && newQuantity > product.stock) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      existingItem.quantity = newQuantity;
      existingItem.price = product.price;
    } else {
      if (product.stock !== undefined && quantity > product.stock) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      item => item.product.toString() === id
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock !== undefined && quantity > product.stock) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    item.quantity = quantity;
    item.price = product.price;

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    const itemExists = cart.items.some(
      item => item.product.toString() === id
    );

    if (!itemExists) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== id
    );

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const mergeLocalCart = async (userId, localCartItems) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const productIds = localCartItems.map(item => item._id);

  const products = await Product.find({
    _id: { $in: productIds }
  });

  const productMap = {};
  products.forEach(p => {
    productMap[p._id.toString()] = p;
  });

  for (const localItem of localCartItems) {
    const product = productMap[localItem._id.toString()];
    if (!product) continue;

    const quantity = localItem.quantity || 1;

    const existingItem = cart.items.find(
      item => item.product.toString() === localItem._id.toString()
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (product.stock !== undefined && newQuantity > product.stock) {
        existingItem.quantity = product.stock; 
      } else {
        existingItem.quantity = newQuantity;
      }

      existingItem.price = product.price;
    } else {
      if (product.stock !== undefined && quantity > product.stock) continue;

      cart.items.push({
        product: product._id,
        quantity,
        price: product.price
      });
    }
  }

  await cart.save();
  await cart.populate("items.product");

  return cart;
};


const mergeCartOnLogin = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items to merge" });
    }

    const mergedCart = await mergeLocalCart(req.user._id, items);

    res.json(mergedCart);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  mergeCartOnLogin,
  mergeLocalCart
};