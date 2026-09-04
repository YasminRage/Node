const port = 3000;
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const User = require("./Models/user");
const db = mongoose.connection;
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require("passport");
const methodOverride = require("method-override");
const router = require("./routes/index");

mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(layouts);

mongoose.connect(
  "mongodb://localhost:27017/yasminsbakery_db",
  { useNewUrlParser: true }
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(cookieParser("secret_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  cookie: { maxAge: 4000000 },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});