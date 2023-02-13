const router = require("express").Router();
const userController = require("../controllers/users.controller");


router.route("/profileById").post(userController.getUserProfileById);
router.route("/update").post();
router.route("/task/all").post();

module.exports = router;