const express = require("express");
const path = require("path");
const postRouter = require("./Routers/Post");
const { adminPost } = require("./Routers/Admin");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.set("views", "Pages");

app.use(express.static(path.join(__dirname, "./public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminPost);

app.use(postRouter);

mongoose // using mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(8080);
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
