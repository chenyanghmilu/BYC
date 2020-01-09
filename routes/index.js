var express = require("express");
var router = express.Router();
var indexCtrl = require("../controllers/index");

//root route
router.get("/", indexCtrl.root);

//register form
router.get("/register", indexCtrl.registerForm);

//register logic
router.post("/register", indexCtrl.registerLogic);

//login form
router.get("/login", indexCtrl.loginForm);

//login logic
router.post('/login', indexCtrl.loginLogic);

//logout route
router.get("/logout", indexCtrl.logout);

module.exports = router;