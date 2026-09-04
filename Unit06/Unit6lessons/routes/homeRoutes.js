const router = require("express").Router();
const homeController = require("../Controllers/homeController");
const subscribersController = require("../Controllers/subscribersController");

router.get("/", (req, res) => res.render("index"));
router.get("/courses", homeController.showCourses);
router.get("/contact", homeController.showSignUp);
router.post("/contact", homeController.postedSignUpForm);
router.get("/contact", subscribersController.getSubscriptionPage);
router.post("/subscribe", subscribersController.saveSubscriber);
router.get("/subscribers", subscribersController.getAllSubscribers);

module.exports = router;