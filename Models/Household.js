// import mongoose
const mongoose = require('../Controllers/connection.js');

// create household schema
const householdSchema = new mongoose.Schema({
    parents: Array,
    kids: Array,
    chores: Array,
    awards: Array
});

// create  model
const Household = mongoose.model('Household', householdSchema);

module.exports = Household;