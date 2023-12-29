// Controllers               // MVC pattern  Model Views Controller

const Post = require("../Models/post.js");

exports.createPost = (req, res) => {
  const { title, description, image } = req.body;
  Post.create({
    title,
    description,
    image_url: image,
  })
    .then((result) => {
      console.log(result);
      return res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.renderCreatePags = (req, res) => {
  // res.sendFile(path.join(__dirname, "../Pages/AddPost.html")); // normal route rendering
  res.render("AddPost", { title: "Add Post" }); // ejs rendering
};

exports.renderHomPages = (req, res) => {
  Post.findAll()
    .then((posts) => {
      res.render("Home", { title: "Helo World", postArray: posts });
    })
    .catch((err) => console.log(err));
};

exports.getPosts = (req, res) => {
  // res.sendFile(path.join(__dirname, "../Pages/Post.html"));
  res.render("Post", { title: "Post" }); // ejs rendering
};

exports.getPost = (req, res) => {
  const id = req.params.postID;
  Post.findByPk(id) // find by primary key
    .then((post) => {
      res.render("details", { title: "Detail Pages", post });
    })
    .catch((err) => console.log(err));
};
