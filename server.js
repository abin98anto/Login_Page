// imports express into this program.
const express = require("express");

// imports the path module.
const path = require("path");

// import body parser module.
const bodyparser = require("body-parser");

// import bodyparser module.
const session = require("express-session");

// imports uuid module and creates a secret key for session.
const { v4: uuidv4 } = require("uuid");

const nocache = require("nocache");

// importing router from the root folder.
const router = require("./router");

// makes an instance of express in app.
const app = express();

// this sets the port number either from the config.env file or a default value is provided (3000).
const port = process.env.PORT || 3000;

// responsible for parsing the incoming request bodies in the middleware before we use it.
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// to set up view engine.
app.set("view engine", "ejs");

app.use(nocache());

// to load static assets like css.
app.use("/static", express.static(path.join(__dirname, "public")));

//using session
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 90000 },
  })
);

// this middleware adds all the routes in the server.
app.use("/route", router);

// home route
app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  }
  res.render("base", { title: "Login System" });
});

// starting the server and listening for requests.
app.listen(port, () => {
  console.log(`server has started at http://localhost:${port}/.`);
});
