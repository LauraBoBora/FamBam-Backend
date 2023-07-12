const { GetHousehold, CreateHousehold } = require("../Controllers/Household");
const router = require("express").Router();

// routes have CRUD methods attached
// when they're called, controller will be executed
router.get("/", GetHousehold);
router.post("/", CreateHousehold);
// router.delete("/household", );

module.exports = router;