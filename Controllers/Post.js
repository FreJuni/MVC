// Controllers               // MVC pattern
const Post = require("../Models/post");

exports.createPost = (req, res) => {
  const { title, description, image } = req.body;
  Post.create({ title, description, image, userId: req.user }) // following es6
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
  // isLogIn = true    we use split to cut out what we need. split return array so we use index to take off what we need and then we transfer to boolean type trim method cut  unesseary things
  const cookie = req.get("Cookie").split("=")[1].trim() === "true";
  console.log(cookie);
  Post.find()
    .select("title")
    .populate("userId", "username") // this is communicate with user
    .sort({ title: -1 })
    .then((posts) => {
      console.log(posts);
      res.render("Home", {
        title: "Home Pages",
        postArray: posts,
        isLogin: cookie,
      }); // ejs rendering
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
  Post.findById(postId)
    .then((post) => {
      res.render("details", { title: "Post Detail", post });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOldPost = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
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
  Post.findById(id)
    .then((post) => {
      post.title = title;
      post.description = description;
      post.image = image;
      return post.save();
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((post) => {
      console.log(post);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
