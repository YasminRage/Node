const Subscriber = require("../models/subscriber");

// Render subscription page (GET /subscribe)
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

// Save a new subscriber (POST /subscribe)
exports.saveSubscriber = async (req, res) => {
  newSubscriber.save()
    .then(result => {
      res.render("thanks");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};

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