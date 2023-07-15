const Household = require('../Models/Household');
const Kid = require('../Models/Kid');
const UserModel = require('../Models/UserModel');

module.exports.GetKids = async (req, res) => {
    try {
        req.status(200).json(await Household.findById(req.user.kids));
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports.CreateKid = async (req, res) => {
    try {
        // create new kid, add household id
        console.log(req.body);
        const newKiddo = {kidUserName: req.body.kidUserName, password: req.body.kidPW, householdId: req.user.householdId};
        const newKid = await Kid.create(newKiddo);
        console.log(newKid);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
