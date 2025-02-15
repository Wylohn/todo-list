const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validator = require("../middleware/validator");
const { userSchema } = require("../validation/schemas");

router.post("/register", validator(userSchema), authController.register);
router.post("/login", validator(userSchema), authController.login);

module.exports = router;
