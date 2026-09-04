const router = require("express").Router();
const userRoutes = require("./userRoutes");
const courseRoutes = require("./courseRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const apiRoutes = require("./apiRoutes");
const homeRoutes = require("./homeRoutes");
const errorRoutes = require("./errorRoutes");

router.use("/user", userRoutes);
router.use("/course", courseRoutes);
router.use("/subscriber", subscriberRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;