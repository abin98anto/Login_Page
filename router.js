// this file is store the various routes that we will use in the program.

var express = require("express");
var router = express.Router();

// credentials to let sever side validation work.
const credentials = {
  email: "123@gmail.com",
  password: 123,
};


function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/");
}

// login router
router.post("/login", (req, res) => {
  if (
    req.body.email == credentials.email &&
    req.body.password == credentials.password
  ) {
    // stores the email to the session object. This makes the server remember who the user is through various requests.
    req.session.user = req.body.email;
    res.redirect("/route/dashboard");
  } else {
    res.end("invalid ccredentials");
  }
});

// dashboard router
router.get("/dashboard",isLoggedIn, (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.send("unauthorized user");
  }
});

// the logout functionality.
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      //res.render("base", {logout: "logout successful.." });
      res.redirect('/');
    }
  });
});

// exporting the entire router module
module.exports = router;
