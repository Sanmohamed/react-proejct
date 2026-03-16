const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getMyFavorites,
  addToFavorites,
  removeFromFavorites,
} = require("../controllers/favoriteControllers");

router.get("/", protect, getMyFavorites);
router.post("/", protect, addToFavorites);
router.delete("/:productId", protect, removeFromFavorites);

module.exports = router;