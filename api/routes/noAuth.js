const logSignController = require("../controllers/loginSignup.controller");
const router = require("express").Router();

router.route("/signup").post(logSignController.signup);
router.route("/isUserNameAvailable").post(logSignController.isUserNameAvailable);
router.route("/isEmailAvailable").post(logSignController.isEmailAvailable);
router.route("/confirmPassword").post(logSignController.confirmPassword);

router.route("/login").post(logSignController.login);

module.exports = router;