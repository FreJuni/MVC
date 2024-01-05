const express = require("express");
const path = require("path");
const postRouter = require("./Routers/Post");
const { adminPost } = require("./Routers/Admin");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./Routers/Auth");
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./Models/user");

// for server
const app = express();

//to store session
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

// for ejs
app.set("view engine", "ejs");
app.set("views", "Pages");

// for middleware
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, // we need only one time cookie so we use false
    saveUninitialized: false,
    store: store, // key value same so use es6
  })
);

// custom middleware for user //
app.use((req, res, next) => {
  User.findById("6596dbe098e14b3765aa7398").then((user) => {
    //custom
    req.user = user;
    next();
  });
});

// route middleware
app.use("/admin", adminPost);
app.use(postRouter);
app.use(authRouter);

// connected to server database
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
