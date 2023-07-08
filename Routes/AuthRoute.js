// https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/

const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

// routes have post method attached
// when they're called, controller will be executed
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);

module.exports = router;