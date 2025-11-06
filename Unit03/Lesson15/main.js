const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./Controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./Controllers/errorController");
const subscribersController = require("./Controllers/subscribersController");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber")
const db = mongoose.connection;

app.set("view engine", "ejs");  //View Engine, set key-value pair
app.use(layouts);

mongoose.connect(
  "mongodb://localhost:27017/yasminsbakery_db",
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


//Responds to POST request @ specified path 
app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

