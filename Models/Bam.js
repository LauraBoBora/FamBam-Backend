// import mongoose
const mongoose = require('../Controllers/connection.js');

// create bam schema
const BamSchema = new mongoose.Schema({
    bamName: String,
    description: String,
    points: Number,
    householdId: String,
    dueDate: Date,
    assignee: {
        type: String,
        default: "Unassigned"
    },
    completed: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false,
    }
});

// create bam model
const Bam = mongoose.model('Bam', BamSchema);

module.export = Bam;