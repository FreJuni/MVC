const express = require("express");
const path = require("path");
const postRouter = require("./Routers/Post");
const { adminPost } = require("./Routers/Admin");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./Routers/Auth");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./Models/user");

const app = express();
app.set("view engine", "ejs");
app.set("views", "Pages");

app.use(express.static(path.join(__dirname, "./public")));

app.use(bodyParser.urlencoded({ extended: false }));

// middleware for user //
app.use((req, res, next) => {
  User.findById("6596dbe098e14b3765aa7398").then((user) => {
    //custom
    req.user = user;
    next();
  });
});

app.use("/admin", adminPost);

app.use(postRouter);

app.use(authRouter);

mongoose // using mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(8080);
    console.log("connected to mongodb");
    return User.findOne().then((user) => {
      if (!user) {
        // User.create({
        //   username: "Bonemyat",
        //   email: "code@gmail.com",
        //   password: "123456",
        // });
      }
      return user;
    });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
