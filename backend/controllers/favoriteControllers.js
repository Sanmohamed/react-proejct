const User = require("../models/User");


const getMyFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user._id);

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }

    res.json({ message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      fav => fav.toString() !== productId
    );

    await user.save();

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getMyFavorites,
  addToFavorites,
  removeFromFavorites,
};