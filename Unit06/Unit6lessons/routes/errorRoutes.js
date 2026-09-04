const router = require("express").Router();
const errorController = require("../Controllers/errorController");

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;