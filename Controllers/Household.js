const Household = require('../Models/Household');
const UserModel = require('../Models/UserModel');
const Bam = require('../Models/Bam');
const Award = require('../Models/Award');

module.exports.GetHousehold = async (req, res) => {
    try {
        res.status(200).json(await Household.findById(req.user.householdId));
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports.CreateHousehold = async (req, res) => {
    try {
        // if there's already a household for the parent, don't create
        if (req.user.householdId) {
            res.status(400).json({"error": "already in household"})
        } else {
            // create household, add parent's id to household obj
            console.log(req.user.id);
            const newHousehold = {householdName: req.body.householdName};
            const householdName = await Household.create(newHousehold);
            console.log(householdName);
            // update user(parent) obj with household id
            const user = await UserModel.findByIdAndUpdate(req.user.id, {householdId: householdName.id});
            console.log(user);
            res.json(householdName);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
}

module.exports.DeleteHousehold = async (req, res) => {
    try {
        const household = await Household.findByIdAndDelete(req.body.householdId);
        const deleteHHFromUser = await UserModel.updateMany({householdId: req.body.householdId}, {$set: {householdId: null}});
        const deletedUsers = await UserModel.deleteMany({householdId: req.body.householdId});
        const deletedBams = await Bam.deleteMany({householdId: req.body.householdId});
        const deletedAwards = await Award.deleteMany({householdId: req.body.householdId});
        console.log(deleteHHFromUser);
        res.staus(204).json(household);
    } catch (error) {
        res.status(400).json(error);
    }
}