const express = require('express');
const router = express.Router();
// const startBooks = require('../db/bookSeedData.js')
const Bam = require('../Models/Bam.js')

// INDEX - show all bams
router.get('/', async (req, res) => {
    try {
        const bams = await Bam.find({});
	    res.json(bams);
    } catch (error) {
        res.status(400).json(error);
    }
});

// SHOW - Get a specific bam
router.get('/:id', async (req, res) => {
    try {
      const bam = await Bam.findById(req.params.id);
      res.json(bam);
    } catch (error) {
      res.status(400).json(error);
    }
});

// CREATE - make a new bam
router.post('/', async (req, res) => {
    try {
      const bam = await Bam.create(req.body);
      res.json(bam);
    } catch (error) {
      res.status(400).json(error);
    }
});

// UPDATE - edit a bam
router.put('/:id', async (req, res) => {
    try {
      const bam = await Bam.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(board);
    } catch (error) {
      res.status(400).json(error);
    }
});

// DELETE - delete a bam
router.delete('/:id', async (req, res) => {
    try {
      const bam = await Bam.findByIdAndRemove(req.params.id);
      res.json(board);
    } catch (error) {
      res.status(400).json(error);
    }
});

module.exports = router;