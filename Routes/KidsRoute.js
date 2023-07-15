// const { GetHousehold, CreateHousehold } = require("../Controllers/Household");
const router = require("express").Router();
const { verify } = require("../Middlewares/AuthMiddleware");
const { CreateKid } = require("../Controllers/KidsController");


// routes have CRUD methods attached
// when they're called, controller will be executed
// router.get("/", GetKids);
router.post("/", verify, CreateKid);
// router.delete("/", );

module.exports = router;