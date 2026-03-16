const express = require("express");
const {protect} = require("../middleware/authMiddleware")
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  mergeCartOnLogin,
} = require("../controllers/cartControllers")

const router = express.Router();


router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.post("/merge", protect, mergeCartOnLogin);
router.post("/clear", protect, clearCart);
router.put("/:id", protect, updateQuantity);
router.delete("/:id", protect, removeFromCart);

module.exports = router;