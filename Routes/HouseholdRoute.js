const { GetHousehold, CreateHousehold } = require("../Controllers/Household");
const router = require("express").Router();
const { verify } = require("../Middlewares/AuthMiddleware");

// routes have CRUD methods attached
// when they're called, controller will be executed
router.get("/", GetHousehold);
router.post("/", verify, CreateHousehold);
// router.delete("/household", );

module.exports = router;