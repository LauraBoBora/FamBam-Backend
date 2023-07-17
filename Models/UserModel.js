// make user schema, password, hashes pw 
// https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/

const mongoose = require("../Controllers/connection.js");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  householdId: {
    type: String,
    default: null,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);