const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./Controllers/homeController");
const layouts = require("express-ejs-layouts");


app.set("view engine", "ejs");
app.use(layouts);

app.get("/name/:myName",homeController.respondWithName)


app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
