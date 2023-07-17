// import mongoose
const mongoose = require('../Controllers/connection.js');
const bcrypt = require("bcrypt");

// create kid schema
const kidSchema = new mongoose.Schema({
    username: String,
    password: String,
    householdId: String,
    awardPoints: Number
});

kidSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});
// create kid model
module.exports = mongoose.model('Kid', kidSchema);
