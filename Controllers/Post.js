// Controllers               // MVC pattern

const posts = [];

const { Post } = require("../Models/post");
const { Edit } = require("../Models/post");

exports.createPost = (req, res) => {
  const { title, description, image } = req.body;
  const post = new Post(title, description, image);
  post
    .create()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.renderCreatePags = (req, res) => {
  res.render("AddPost", { title: "Add Post" }); // ejs rendering
};

exports.renderHomPages = (req, res) => {
  // res.sendFile(path.join(__dirname, "../Pages/Home.html"));
  Post.getPosts()
    .then((posts) => {
      res.render("Home", { title: "Helo World", postArray: posts }); // ejs rendering
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.renderPostPages = (req, res) => {
  // res.sendFile(path.join(__dirname, "../Pages/Post.html"));
  res.render("Post", { title: "Post" }); // ejs rendering
};

exports.getPost = (req, res) => {
  const postId = req.params.postID;
  Post.getPost(postId)
    .then((post) => {
      res.render("details", { title: "Post Detail", post });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOldPost = (req, res) => {
  const id = req.params.id;
  Post.getOldPost(id)
    .then((post) => {
      console.log(post);
      res.render("Edit", { title: "Edit Post", post });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editPost = (req, res) => {
  const { title, description, image, id } = req.body;
  const post = new Post(title, description, image, id);
  post
    .create()
    .then((post) => {
      console.log(post);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.deletePost(id)
    .then((post) => {
      console.log(post);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
