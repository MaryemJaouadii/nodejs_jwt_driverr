const driverController = require("../controllers/drivers.controller");

const express = require("express");
const router = express.Router();

router.post("/register", driverController.register);
router.post("/login", driverController.login);
router.post("/driver-profile", driverController.driverProfile);

module.exports = router;
