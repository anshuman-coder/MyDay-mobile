const router = require("express").Router();

const noAuthRoutes = require("./noAuth");

router.use("/public", noAuthRoutes);
// router.use("/user");
// router.use("/tasks");


module.exports = router;