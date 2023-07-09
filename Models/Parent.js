// import mongoose
const {mongoose} = require('../index');

// create parent schema
const parentSchema = new mongoose.Schema({
    userName: String,
    parentName: String,
    password: String,
    householdId: String
});

// create parent model
const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;