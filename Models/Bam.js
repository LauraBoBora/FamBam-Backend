// import mongoose
const mongoose = require('../index.js');

// create bam schema
const bamSchema = new mongoose.Schema({
    bamName: String,
    description: String,
    points: Number,
    householdId: String,
    dueDate: Date,
    assignee: String,
    completed: Boolean
});

// create bam model
const Bam = mongoose.model('Bam', bamSchema);

module.export = Bam;