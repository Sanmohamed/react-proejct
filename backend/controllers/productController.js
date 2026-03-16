
const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

const getProducts = async (req, res) => {
  try {
    const filter = {};


    if (req.query.category) {
      filter.category = req.query.category;
    }


    if (req.query.subCategory) {
      const subs = Array.isArray(req.query.subCategory)
        ? req.query.subCategory
        : [req.query.subCategory];

      filter.subCategory = { $in: subs };
    }

 
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
      ];
    }


    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};

      if (req.query.minPrice) {
        filter.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filter.price.$lte = Number(req.query.maxPrice);
      }
    }

  
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 8, 50);
    const skip = (page - 1) * limit;

 
    let sortOption = { createdAt: -1 }; 

    if (req.query.sort === "price-asc") {
      sortOption = { price: 1 };
    }

    if (req.query.sort === "price-desc") {
      sortOption = { price: -1 };
    }

    if (req.query.sort === "name-asc") {
      sortOption = { name: 1 };
    }

    if (req.query.sort === "name-desc") {
      sortOption = { name: -1 };
    }

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalProducts: total,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const createProduct = async (req, res) => {
  try {
    const { name, price, category, subCategory, description } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "name, price and category are required" });
    }

    const product = await Product.create({
      name,
      price,
      category,
      subCategory,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.file) {
      if (product.image) {
        const oldPath = path.join(__dirname, "..", product.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      product.image = `/uploads/${req.file.filename}`;
    }

    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category ?? product.category;
    product.subCategory = req.body.subCategory ?? product.subCategory;
    product.description = req.body.description ?? product.description;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};



