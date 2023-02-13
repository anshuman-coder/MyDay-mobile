const router = require("express").Router();
const authentication = require("../middleware/Auth");

const noAuthRoutes = require("./noAuth");
const userRoutes = require("./users");

router.use("/public", noAuthRoutes);
router.use("/user", authentication.userAuthentication, userRoutes);
// router.use("/tasks");


module.exports = router;