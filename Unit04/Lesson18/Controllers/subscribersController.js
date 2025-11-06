const Subscriber = require("../Models/subscriber");

// Controller actions exported together
module.exports = {
  // Get all subscribers
  getAllSubscribers: async (req, res) => {
    Subscriber.find({})
      .exec()
      .then((subscribers) => {
        res.render("subscribers", { subscribers: subscribers });
      })
      .catch((error) => {
        console.log(error.message);
        return [];
      })
      .then(() => {
        console.log("promise complete");
      });
  },

  // Render subscription page
  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },

  // Save a new subscriber
  saveSubscriber: async (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      postcode: req.body.postcode
    });
    newSubscriber.save()
      .then(() => res.render("thanks"))
      .catch(error => res.send(error));
  }
};
