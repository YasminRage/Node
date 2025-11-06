const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./Controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./Controllers/errorController");
const MongoDB = require("mongodb").MongoClient,
    dbURL = "mongodb://localhost:27017",
    dbName = "testing_db";
MongoDB.connect(
  dbURL,
  (error, client) => {
    if (error) throw error;
    let db = client.db(dbName);
    db.collection("contacts")
      .find()
      .toArray((error, data) => {
        if (error) throw error;
        console.log(data);
      });

    db.collection("contacts").insert(
      {
        name: "Yasmin Rage",
        email: "yasmin_rage@outlook.com"
      },
      (error, db) => {
        if (error) throw error;
        console.log(db);
      }
    );
  }
);


app.set("view engine", "ejs");   
app.use(express.json());
app.use(express("public"));
app.use(
        express.urlencoded({
            extended: false
        })
    )

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


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});