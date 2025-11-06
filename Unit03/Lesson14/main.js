const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./Controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./Controllers/errorController");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
);

app.set("view engine", "ejs");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
)

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

//View Engine, set key-value pair
app.set("view engine", "ejs");

//Middlewear
app.use(layouts);
app.use(express.static("public"))

//// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Confetti Cuisine!");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

//Error that handled middlewear
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

var myQuery = Subscriber.findOne({
  name: "Prince"
})
  .where("Purple@rain.com", /Yasmin/);
myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});

//Resolved as myQuery command no longer is supported
Subscriber.findOne({ name: "Prince" })
  .where("email").equals("Purple@rain.com")
  .then(data => {
    if (data) console.log(data.name);
  })
  .catch(error => console.error(error));


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});