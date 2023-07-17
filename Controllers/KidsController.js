const Household = require('../Models/Household');
const Kid = require('../Models/Kid');
const UserModel = require('../Models/UserModel');

// GET /kids
module.exports.GetKids = async (req, res) => {
    try {
        const query = { householdId: req.user.householdId };
        const kids = await Kid.find(query);
        // const household = await Household.findById(req.user.householdId);
        console.log(kids);
        res.status(200).json(kids);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// PUT /kids/:kidId
// todo: user.isParent check?
module.exports.UpdateKid = async (req, res) => {
    try {
        const kidId = req.params.kidId;
        const kid = await Kid.findById(kidId);
        if (req.user.householdId === kid.householdId) {
            console.log("Updating Kid: " + kidId);
            const update = await Kid.findByIdAndUpdate(kidId, req.body);
            res.status(200).json(update);
        } else {
            res.status(404).json({error: "Kid not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// DELETE /kids/:kidId
module.exports.DeleteKid = async (req, res) => {
    try {
        const kidId = req.params.kidId;
        const kid = await Kid.findById(kidId);
        // make sure we should be allowed to do this
        // todo: user.isParent check?
        if (req.user.householdId === kid.householdId) {
            console.log("Deleting Kid: " + kidId);
            const update = await Kid.findByIdAndDelete(kidId);
            res.status(200).json(update);
        } else {
            res.status(404).json({error: "Kid not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// POST /kids
module.exports.CreateKid = async (req, res) => {
    try {
        // create new kid, add household id
        console.log(req.body);
        const newKiddo = {username: req.body.kidUserName, password: req.body.kidPW, householdId: req.user.householdId};
        const newKid = await Kid.create(newKiddo);
        console.log(newKid);
        // update household with Kid
        res.status(201).json(newKid);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
