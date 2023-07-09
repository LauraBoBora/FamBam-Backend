// import mongoose
const {mongoose} = require('../index');

// create bam schema
const bamSchema = new mongoose.Schema({
    name: String,
    description: String,
    points: Number,
    householdId: String,
    dueDate: Date,
    assignee: String,
    completed: Boolean
});

// create bam model
const Bam = mongoose.model('Bam', bamSchema);

module.exports = Bam;