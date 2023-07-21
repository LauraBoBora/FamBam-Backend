// https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/

const User = require("../Models/UserModel");
const Kid = require("../Models/Kid");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// checks user has access to the route by checking if tokens match
module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  console.log(token);
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      let user = await User.findById(data.id);
      let isParent = false;
      if (!user) {
        user = await Kid.findById(data.id);
        isParent = false;
      } else {
        isParent = true;
      }
      if (user) return res.json({ status: true, user: user.username, householdId: user.householdId, isParent: isParent})
      else return res.json({ status: false })
    }
  })
}

// verify JWT, grabbing user obj from JWT
// https://www.youtube.com/watch?v=Yh5Lil03tpI
module.exports.verify = (req, res, next) => {
  const authHeader = req.cookies.token;
  console.log("authHeader: ", authHeader);
  if (authHeader) {
    jwt.verify(authHeader, process.env.TOKEN_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      // try to get from user table
      let u = await User.findById(user.id);
      // if not, check kid's table
      if (!u) {
        u = await Kid.findById(user.id);
        // makes value of isParent on user
        u.isParent = false;
      } else {
        u.isParent = true;
      }
      req.user = u;
      // do next function in route (CreateHousehold)
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
}