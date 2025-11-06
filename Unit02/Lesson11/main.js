const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./Controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./Controllers/errorController");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express("public"));
app.use(
    express.urlencoded({
        extended: false
    })
)

app.use(layouts);
app.use(errorController.logErrors);
app.get("/name", homeController.respondWithName);
app.get("/name/:myName", homeController.respondWithName);
app.use(errorController.logErrors);
app.use(express.static("public"))

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

//PrintLogs
app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});