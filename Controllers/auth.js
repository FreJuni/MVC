exports.getLoginPage = (req, res) => {
  res.render("../Pages/auth/login", { title: "Login Pages" });
};

exports.postLoginData = (req, res) => {
  // res.setHeader("Set-Cookie", "isLogIn=true"); // header name // key value
  req.session.isLogin = true;
  res.redirect("/");
};

exports.logOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
