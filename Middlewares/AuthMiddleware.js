// https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/

const User = require("../Models/UserModel");
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
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username, userHHId: user.householdId })
      else return res.json({ status: false })
    }
  })
}

// verify JWT, grabbing user obj from JWT
// https://www.youtube.com/watch?v=Yh5Lil03tpI
module.exports.verify = (req, res, next) => {
  const authHeader = req.cookies.token;
  console.log(authHeader);
  if (authHeader) {
    jwt.verify(authHeader, process.env.TOKEN_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = await User.findById(user.id);
      // do next function in route (CreateHousehold)
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
}