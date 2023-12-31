// import mongoose
const mongoose = require('../Controllers/connection.js');

// create household schema
const householdSchema = new mongoose.Schema({
    householdName: String,
    householdId: String,
});

// create  model
const Household = mongoose.model('Household', householdSchema);

module.exports = Household;