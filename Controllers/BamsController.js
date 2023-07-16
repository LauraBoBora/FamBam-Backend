const Household = require('../Models/Household');
const Bam = require('../Models/Bam');

// GET /bams
module.exports.GetBams = async (req, res) => {
    try {
        const query = { householdId: req.user.householdId };
        const bams = await bams.find(query);
        // const household = await Household.findById(req.user.householdId);
        console.log(bams);
        res.status(200).json(bams);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// PUT /bams/:bamId
// todo: user.isParent check?
// todo: parents can update assignee but kids should only be able
// to assign it to themselves if it's unassigned
module.exports.UpdateBam = async (req, res) => {
    try {
        const bamId = req.params.bamId;
        const bam = await Bam.findById(bamId);
        if (req.user.householdId === bam.householdId) {
            console.log("Updating Bam: " + bamId);
            const update = await Bam.findByIdAndUpdate(req.body);
            res.status(200).json(update);
        } else {
            res.status(404).json({error: "Bam not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// PUT /bams/:bamId/claim
module.exports.ClaimBam = async (req, res) => {
    try {
        const bamId = req.params.bamId;
        const kidId = req.body.kidId;
        const bam = await Bam.findById(bamId);
        // are we of the same household?
        if (req.user.householdId === bam.householdId) {
            // is it already assigned?
            if (bam.assignee !== null) {
                console.log("Updating Bam: " + bamId);
                const update = await Bam.findByIdAndUpdate({assignee: kidId});
                res.status(200).json(update);
            } else {
                res.status(400).json({error: "Bam already assigned"});
            }
        } else {
            res.status(404).json({error: "Bam not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// PUT /bams/:bamId/verify
// PARENT ONLY
module.exports.VerifyBam = async (req, res) => {
    try {
        const bamId = req.params.bamId;
        const bam = await Bam.findById(bamId);
        // are we of the same household? Are we a parent? Is it assigned?
        if (req.user.householdId === bam.householdId 
                && req.user.isParent 
                && bam.assignee !== null) {
            console.log("Verified Bam: " + bamId);
            // bam verified
            const verifiedBam = await Bam.findByIdAndUpdate(bamId, {verified: true});
            // Add the points to the kid's doc
            Kid.findByIdAndUpdate(
                bam.assignee, 
                {$inc: {awardPoints: bam.points}}
            );
            res.status(200).json(verifiedBam);
        } else {
            res.status(404).json({error: "Bam not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// DELETE /bams/:bamId
// todo: user.isParent check?
module.exports.DeleteBam = async (req, res) => {
    try {
        const bamId = req.params.bamId;
        const bam = await Bam.findById(bamId);
        // make sure we should be allowed to do this
        // todo: user.isParent check?
        if (req.user.householdId === bam.householdId) {
            console.log("Deleting Bam: " + bamId);
            const update = await Bam.findByIdDelete(req.body);
            res.status(200).json(update);
        } else {
            res.status(404).json({error: "Bam not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// POST /bam
module.exports.CreateBam = async (req, res) => {
    try {
        // create new bam
        console.log(req.body);
        const newBam = await Bam.create(req.body);
        console.log(newBam);
        res.status(201).json(newBam);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
