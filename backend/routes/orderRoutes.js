const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

const {
  checkoutOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderControllers");


router.post("/checkout", protect, checkoutOrder);


router.get("/myorders", protect, getMyOrders);


router.get("/", protect, admin, getAllOrders);

router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;