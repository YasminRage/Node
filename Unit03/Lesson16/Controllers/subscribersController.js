const Subscriber = require("../models/subscriber");
const mongoose = require("mongoose"),


  subscriberSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      unique: true
    },
    postcode: {
      type: String,
      minlength: 5,
      maxlength: 8
    }
  });


// Get all subscribers (GET /subscribers) + promise
exports.getAllSubscribers = async (req, res) => {
  Subscriber.find({})
    .exec()
    .then((subscribers) => {
      res.render("subscribers", {
        subscribers: subscribers
      });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

// Render subscription page (GET /subscribe)
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

// Save a new subscriber (POST /subscribe)
exports.saveSubscriber = async (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    postcode: req.body.postcode
  });
  newSubscriber.save()
    .then(() => {
      res.render("thanks");
    })
    .catch(error => {
      res.send(error);
    });
};
