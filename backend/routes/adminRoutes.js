const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/stats", protect, admin, async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();

    const totalSalesData = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const totalSales = totalSalesData[0]?.total || 0;

    res.json({
      productsCount,
      usersCount,
      ordersCount,
      totalSales
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;