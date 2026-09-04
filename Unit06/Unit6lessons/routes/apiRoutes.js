const router = require("express").Router();
const userController = require("../Controllers/userController");
const courseController = require("../Controllers/courseController");

router.post("/login", userController.apiAuthenticate);
router.use(userController.verifyJWT);

router.get("/courses", courseController.index, courseController.filterUserCourses, courseController.respondJSON);
router.get("/courses/:id/join", courseController.join, courseController.respondJSON);
router.use(courseController.errorJSON);

module.exports = router;