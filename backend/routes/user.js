const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Admin = require("../middleware/admin");

router.post("/registerUser", userController.registerUser);
router.post("/login", userController.login);
router.get("/listUsers/:name?",Auth,ValidateUser, userController.listUser);
router.get("/getRole/:email", Auth, ValidateUser, userController.getRole);

module.exports = router;
