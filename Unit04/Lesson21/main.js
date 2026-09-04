const port = 3000;
const express = require("express");
const app = express();
const router = express.Router()
const homeController = require("./Controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./Controllers/errorController");
const subscribersController = require("./Controllers/subscribersController");
const mongoose = require("mongoose");
const Subscriber = require("./Models/subscriber")
const userController = require("./Controllers/userController");
const courseController = require("./Controllers/courseController");
const db = mongoose.connection;
const methodOverride = require("method-override");

mongoose.Promise = global.Promise;


app.set("view engine", "ejs");  //View Engine, set key-value pair
app.use(layouts);

mongoose.connect(
  "mongodb://localhost:27017/yasminsbakery_db",
  { useNewUrlParser: true }
);

//Middlewear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))



//Routes
app.get("/", (req, res) => res.render("index"));
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/user", userController.index, userController.indexView);
app.get("/user/new", userController.new);
app.post("/user/create", userController.create, userController.redirectView);
app.get("/user/:id", userController.show, userController.showView);
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.get("/user/:id/edit", userController.edit);
app.put("/user/:id/update", userController.update, userController.redirectView);
app.delete("/user/:id/delete", userController.delete, userController.redirectView);

app.get("/course", courseController.index, courseController.indexView);
app.get("/course/new", courseController.new);
app.post("/course/create", courseController.create, courseController.redirectView);
app.get("/course/:id", courseController.show, courseController.showView);
app.get("/course/:id/edit", courseController.edit);
app.put("/course/:id/update", courseController.update, courseController.redirectView);
app.delete("/course/:id/delete", courseController.delete, courseController.redirectView);

app.get("/subscriber", subscribersController.index, subscribersController.indexView);
app.get("/subscriber/new", subscribersController.new);
app.post("/subscriber/create", subscribersController.create, subscribersController.redirectView);
app.get("/subscriber/:id", subscribersController.show, subscribersController.showView);
app.get("/subscriber/:id/edit", subscribersController.edit);
app.put("/subscriber/:id/update", subscribersController.update, subscribersController.redirectView);
app.delete("/subscriber/:id/delete", subscribersController.delete, subscribersController.redirectView);

//Responds to POST request @ specified path 
app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

