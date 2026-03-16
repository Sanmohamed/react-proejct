const Order = require("../models/Order");
const Cart = require("../models/Cart");

// 🛒 Checkout + Mock Payment
const checkoutOrder = async (req, res) => {
  try {
    const { address, city, phone, cardNumber, expiryDate, cvv } = req.body;

    // Validate shipping
    if (!address || !city || !phone) {
      return res.status(400).json({ message: "بيانات الشحن مطلوبة" });
    }

    // Validate mock card
    if (!cardNumber || cardNumber.length < 16) {
      return res.status(400).json({ message: "رقم البطاقة غير صالح" });
    }
    if (!expiryDate) {
      return res.status(400).json({ message: "تاريخ الانتهاء مطلوب" });
    }
    if (!cvv || cvv.length < 3) {
      return res.status(400).json({ message: "CVV غير صالح" });
    }

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "السلة فارغة" });
    }

    const orderItems = [];

    for (const item of cart.items) {
      if (!item.product) continue;

      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `المنتج ${item.product.name} غير متوفر بالكمية المطلوبة`,
        });
      }

      orderItems.push({
        product: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      });

      item.product.stock -= item.quantity;
      await item.product.save();
    }

    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress: { address, city, phone },
      paymentMethod: "mock-card",
      paymentResult: {
        transactionId: "MOCK_" + Date.now(),
        last4: cardNumber.slice(-4),
      },
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      status: "confirmed",
    });

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 👤 My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 👑 Admin - All Orders
const getAllOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔄 Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id)
      .populate("orderItems.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Restore stock only if not already cancelled
    if (status === "cancelled" && order.status !== "cancelled") {
      for (const item of order.orderItems) {
        if (item.product) {
          item.product.stock += item.quantity;
          await item.product.save();
        }
      }
    }

    order.status = status;

    if (status === "delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  checkoutOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};