// import mongoose
const mongoose = require('../Controllers/connection.js');

// create kid schema
const kidSchema = new mongoose.Schema({
    kidUserName: String,
    password: String,
    householdId: String,
    awardPoints: Number
});

// create kid model
const Kid = mongoose.model('Kid', kidSchema);

module.exports = Kid;