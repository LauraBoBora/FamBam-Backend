// https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/

const User = require("../Models/UserModel");
const Kid = require("../Models/Kid");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

// sign up new user
module.exports.Signup = async (req, res, next) => {
  try {
    // user inputs obtained
    const { password, username, createdAt } = req.body;
    // check username to make sure no past registrations
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ password, username, createdAt });
    // _id from MongoDB
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

// check if username and pw match any previously stored in user db
module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if(!username || !password ){
      return res.json({message:'All fields are required'})
    }
    let user = await User.findOne({ username });
    console.log(user);
    if(!user){
      console.log("Didn't find it in User's table");
      user = await Kid.findOne({ username: { $eq: username }});
      console.log(user);
      if(!user){
        return res.json({message:'Incorrect password or username' }) 
      }
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or username' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
       sameSite: "none",
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}