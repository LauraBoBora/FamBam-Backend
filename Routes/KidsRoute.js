const router = require("express").Router();
const { verify } = require("../Middlewares/AuthMiddleware");
const { CreateKid, GetKids, UpdateKid, DeleteKid } = require("../Controllers/KidsController");


// routes have CRUD methods attached
// when they're called, controller will be executed
router.get("/", verify, GetKids);
router.put("/:kidId", verify, UpdateKid);
router.post("/", verify, CreateKid);
router.delete("/:kidId", verify, DeleteKid);

module.exports = router;