const express = require('express');
const router = express.Router();
const Household = require('../Models/Household');
const UserModel = require('../Models/UserModel');

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
            const newHousehold = {householdName: req.body.householdName, parents: [req.user.id]};
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
        const household = await Household.findByIdAndDelete(req.params.id);
        res.json(household);
    } catch (error) {
        res.status(400).json(error);
    }
}