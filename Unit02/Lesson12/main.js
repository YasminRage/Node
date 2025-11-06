const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const homeController = require("./Controllers/homeController");
const errorController = require("./Controllers/errorController");

app.set("view engine", "ejs");  //View Engine, set key-value pair
app.use(layouts);

//Parser
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

//Static
app.use(express.static("public"))


//Middlewear
app.use(express.static("public"))

// Routes 
app.get("/", (req, res) => res.render("index"));
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);


//Error that handled middlewear
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});