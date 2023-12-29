// Controllers               // MVC pattern  Model Views Controller

const Post = require("../Models/post.js");

// render for createpost
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

// render for create pages
exports.renderCreatePags = (req, res) => {
  // res.sendFile(path.join(__dirname, "../Pages/AddPost.html")); // normal route rendering
  res.render("AddPost", { title: "Add Post" }); // ejs rendering
};

// render for home pages
exports.renderHomPages = (req, res) => {
  Post.findAll({ order: [["createdAt", "desc"]] })
    .then((posts) => {
      res.render("Home", { title: "Helo World", postArray: posts });
    })
    .catch((err) => console.log(err));
};

// render for post pages
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

// delete function //
exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((post) => {
      if (!post) {
        res.redirect("/");
      }
      return post.destroy();
    })
    .then((result) => {
      console.log("sucessful delete method.");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

// post-edit //
exports.upadtePost = (req, res) => {
  const { title, description, image, postId } = req.body;
  Post.findByPk(postId)
    .then((post) => {
      (post.title = title),
        (post.description = description),
        (post.image_url = image);
      return post.save();
    })
    .then((result) => {
      console.log("updated sucessfully.");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

// restricts old data
exports.getOldPost = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((post) => {
      res.render("Edit", { title: `${post.title}`, post });
    })
    .catch((err) => log(err));
};
