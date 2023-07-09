// import mongoose
const {mongoose} = require('../index');

// create award schema
const awardSchema = new mongoose.Schema({
    awardName: String,
    points: Number,
    householdId: String
});

// create award model
const Award = mongoose.model('Award', awardSchema);

module.exports = Award;