const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postSchema = new Schema({
  // this new Schema will be our document property
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // this mean can communicate with User collection
    required: true,
  },
});

module.exports = model("Post", postSchema);
