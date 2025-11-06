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
    postcode: "En3 6H4",
})

Subscriber.findOne({
    name: "Jon"
}).then(result => {
    subscriber = result;
    console.log(subscriber.getInfo());
});

Subscriber.populate(subscriber, "courses")

//creating new user:
var testUser; User.create({
    name: {
        first: "Jon",
        last: "Wexler"
    },
        email: "jon@jonwexler.com",
password: "pass123"
})