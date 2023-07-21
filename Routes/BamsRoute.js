const router = require("express").Router();
const { verify } = require("../Middlewares/AuthMiddleware");
const { CreateBam, GetBams, UpdateBam, DeleteBam, ClaimBam, VerifyBam, CompleteBam, ResetBam } = require("../Controllers/BamsController");


// routes have CRUD methods attached
// when they're called, controller will be executed
router.get("/", verify, GetBams);
router.put("/:bamId", verify, UpdateBam);
router.put("/:bamId/claim", verify, ClaimBam);
router.put("/:bamId/verify", verify, VerifyBam);
router.put("/:bamId/complete", verify, CompleteBam);
router.put("/:bamId/reset", verify, ResetBam);
router.post("/", verify, CreateBam);
router.delete("/:bamId", verify, DeleteBam);

module.exports = router;