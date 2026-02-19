const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: String,
  expiresAt: Date,
});

module.exports = mongoose.model("BlacklistedToken", tokenSchema);
