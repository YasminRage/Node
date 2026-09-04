const Subscriber = require("../Models/subscriber");
const Course = require("../Models/course");

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
    let subscriberParams = {
      name: req.body.name,
      email: req.body.email,
      postcode: req.body.postcode,
      courses: req.body.courses
    };
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscriber";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
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
      subscriberParams = {
        name: req.body.name,
        email: req.body.email,
        postcode: req.body.postcode,
        courses: req.body.courses
      };
    Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams })
      .then(subscriber => {
        res.locals.redirect = `/subscriber/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndDelete(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscriber";
        next();
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};