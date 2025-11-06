const port = 3000;
const express = require("express");
const app = express();


app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

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