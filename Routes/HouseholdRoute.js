const { GetHousehold, CreateHousehold, DeleteHousehold, UpdateHousehold } = require("../Controllers/Household");
const router = require("express").Router();
const { verify } = require("../Middlewares/AuthMiddleware");

// routes have CRUD methods attached
// when they're called, controller will be executed
router.get("/", verify, GetHousehold);
router.post("/", verify, CreateHousehold);
router.put("/", verify, UpdateHousehold);
router.delete("/", verify, DeleteHousehold);

module.exports = router;