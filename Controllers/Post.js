// Controllers               // MVC pattern

const posts = [];

exports.createPost = (req, res) => {
  const { title, description, image } = req.body;
  console.log(title, description);
  posts.push({
    id: Math.random(),
    title,
    description,
    image,
  });

  res.redirect("/");
};

exports.renderCreatePags = (req, res) => {
  // res.sendFile(path.join(__dirname, "../Pages/AddPost.html")); // normal route rendering
  res.render("AddPost", { title: "Add Post" }); // ejs rendering
};

exports.renderHomPages = (req, res) => {
  // res.sendFile(path.join(__dirname, "../Pages/Home.html"));
  res.render("Home", { title: "Helo World", postArray: posts }); // ejs rendering
};

exports.renderPostPages = (req, res) => {
  // res.sendFile(path.join(__dirname, "../Pages/Post.html"));
  res.render("Post", { title: "Post" }); // ejs rendering
};

exports.getPost = (req, res) => {
  const id = Number(req.params.postID);
  const post = posts.find((post) => post.id === id);

  res.render("details", { title: "Post Details", post });
};
