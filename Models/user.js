const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minLength: 6,
    required: true,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
  },
});

module.exports = model("User", userSchema);
