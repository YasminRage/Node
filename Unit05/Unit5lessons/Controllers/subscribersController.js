const Subscriber = require("../Models/subscriber");
const Course = require("../Models/course");

const getSubscriberParams = body => {
  return {
    name: body.name,
    email: body.email,
    postcode: body.postcode,
    courses: body.courses
  };
};

module.exports = {
  // --- Pre-existing actions ---
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

  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },

  saveSubscriber: async (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      postcode: req.body.postcode
    });
    newSubscriber.save()
      .then(() => res.render("thanks"))
      .catch(error => res.send(error));
  },

  // --- CRUD actions ---
  index: (req, res, next) => {
    Subscriber.find()
      .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("subscriber/index");
  },

  new: (req, res, next) => {
    Course.find()
      .then(courses => {
        res.render("subscriber/new", { courses: courses });
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },

  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        req.flash("success", `${subscriber.name} subscribed successfully!`);
        res.locals.redirect = "/subscriber";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        res.locals.redirect = "/subscriber/new";
        req.flash("error", `Failed to subscribe because: ${error.message}.`);
        next();
      });
  },

  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .populate("courses")
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("subscriber/show");
  },

  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Promise.all([
      Subscriber.findById(subscriberId),
      Course.find()
    ])
      .then(([subscriber, courses]) => {
        res.render("subscriber/edit", { subscriber: subscriber, courses: courses });
      })
      .catch(error => {
        console.log(`Error fetching subscriber/courses: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let subscriberId = req.params.id,
      subscriberParams = getSubscriberParams(req.body);
    Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams })
      .then(subscriber => {
        req.flash("success", `${subscriber.name}'s details updated successfully!`);
        res.locals.redirect = `/subscriber/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        res.locals.redirect = `/subscriber/${subscriberId}/edit`;
        req.flash("error", `Failed to update subscriber because: ${error.message}.`);
        next();
      });
  },

  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndDelete(subscriberId)
      .then(() => {
        req.flash("success", "Subscriber deleted successfully!");
        res.locals.redirect = "/subscriber";
        next();
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        req.flash("error", `Failed to delete subscriber because: ${error.message}.`);
        res.locals.redirect = "/subscriber";
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};