const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./Controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./Controllers/errorController");
const subscribersController = require("./Controllers/subscribersController");
const mongoose = require("mongoose");
const userController = require("./Controllers/userController");
const courseController = require("./Controllers/courseController");
const User = require("./Models/user");
const db = mongoose.connection;
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require("passport");
const methodOverride = require("method-override");

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

// Home / static-ish routes
app.get("/", (req, res) => res.render("index"));
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/subscribers", subscribersController.getAllSubscribers);

// User login/logout — must come BEFORE /user/:id
app.get("/user/login", userController.login);
app.post("/user/login", userController.authenticate);
app.get("/user/logout", userController.logout, userController.redirectView);

// User CRUD
app.get("/user", userController.index, userController.indexView);
app.get("/user/new", userController.new);
app.post("/user/create", userController.create, userController.redirectView);
app.get("/user/:id", userController.show, userController.showView);
app.get("/user/:id/edit", userController.edit);
app.put("/user/:id/update", userController.update, userController.redirectView);
app.delete("/user/:id/delete", userController.delete, userController.redirectView);

// Course CRUD
app.get("/course", courseController.index, courseController.indexView);
app.get("/course/new", courseController.new);
app.post("/course/create", courseController.create, courseController.redirectView);
app.get("/course/:id", courseController.show, courseController.showView);
app.get("/course/:id/edit", courseController.edit);
app.put("/course/:id/update", courseController.update, courseController.redirectView);
app.delete("/course/:id/delete", courseController.delete, courseController.redirectView);

// Subscriber CRUD
app.get("/subscriber", subscribersController.index, subscribersController.indexView);
app.get("/subscriber/new", subscribersController.new);
app.post("/subscriber/create", subscribersController.create, subscribersController.redirectView);
app.get("/subscriber/:id", subscribersController.show, subscribersController.showView);
app.get("/subscriber/:id/edit", subscribersController.edit);
app.put("/subscriber/:id/update", subscribersController.update, subscribersController.redirectView);
app.delete("/subscriber/:id/delete", subscribersController.delete, subscribersController.redirectView);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});