const express = require('express');
const router = express.Router();
const Household = require('../Models/Household');

module.exports.GetHousehold = async (req, res) => {
    res.send("farts") 
}

module.exports.CreateHousehold = async (req, res) => {
    try {
        const householdName = await Household.create(req.body);
        res.json(householdName)
    } catch (error) {
        res.status(400).json(error);
      }
}



// Get all boards
// router.get('/', async (req, res) => {
//     try {
//       const boards = await Board.find({}).populate('cards');
//       res.json(boards);
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   });


//     try {
//       // user inputs obtained
//       const { email, password, username, createdAt } = req.body;
//       // check email to make sure no past registrations
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.json({ message: "User already exists" });
//       }
//       const user = await User.create({ email, password, username, createdAt });
//       // _id from MongoDB
//       const token = createSecretToken(user._id);
//       res.cookie("token", token, {
//         withCredentials: true,
//         httpOnly: false,
//       });
//       res
//         .status(201)
//         .json({ message: "User signed in successfully", success: true, user });
//       next();
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

// get household
// router.get('/', async (req, res) => {
// //   try {
// //     const boards = await Board.find({}).populate('cards');
// //     res.json(boards);
// //   } catch (error) {
// //     res.status(400).json(error);
// //   }

// });