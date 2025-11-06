// repl.js

const mongoose = require("mongoose");
const Subscriber = require("./Models/subscriber");
const Course = require("./Models/courses");

mongoose.connect("mongodb://localhost:27017/yasminsbakery_db", {
});
mongoose.Promise = global.Promise;


Subscriber.create({
name: "Jon",
email: "testingtoday@i.com",
postcode: "En3 6L898329873982E",
})