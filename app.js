const express = require("express");
const path = require("path");
const postRouter = require("./Routers/Post");
const { adminPost } = require("./Routers/Admin");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "Pages");

const Post = require("./Models/post");
const User = require("./Models/user");

app.use(express.static(path.join(__dirname, "./public")));

app.use("/post", (req, res, next) => {
  console.log("Posts middle ware.");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

// middleware for association //

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  console.log("middle ware.");
  next();
});

app.use("/admin", adminPost);

app.use("/admin", (req, res, next) => {
  console.log("admin middleware");
  next();
});
app.use(postRouter);

Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Post);

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "Kham", email: "kham@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(8080);
  })
  .catch((err) => console.log(err));
