// import mongoose
const {mongoose} = require('../index');

// create household schema
const householdSchema = new mongoose.Schema({
    parents: Array,
    kids: Array,
    chores: Array,
    awards: Array
});

// create household model
const Household = mongoose.model('Household', householdSchema);

module.exports = Household;