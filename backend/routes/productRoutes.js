const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
    isValid ? cb(null, true) : cb(new Error("Images only"));
  },
});

router.get("/", getProducts);


router.get("/:id", async (req, res) => {
  try {
    const product = await require("../models/Product").findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", protect, admin, upload.single("image"), createProduct);


router.put("/:id", protect, admin, upload.single("image"), updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;