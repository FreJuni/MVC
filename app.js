const express = require("express");
const path = require("path");
const postRouter = require("./Routers/Post");
const { adminPost } = require("./Routers/Admin");
const bodyParser = require("body-parser");
const mongoConnector = require("./util/database");

const app = express();
app.set("view engine", "ejs");
app.set("views", "Pages");

app.use(express.static(path.join(__dirname, "./public")));

app.use("/post", (req, res, next) => {
  console.log("Posts middle ware.");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

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

mongoConnector();

app.listen(8080);
