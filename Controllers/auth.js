exports.getLoginPage = (req, res) => {
  res.render("../Pages/auth/login", { title: "Login Pages" });
};

exports.postLoginData = (req, res) => {
  res.setHeader("Set-Cookie", "isLogIn=true"); // header name // key value
  res.redirect("/");
};
