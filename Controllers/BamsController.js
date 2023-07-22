const Bam = require('../Models/Bam');
const Kid = require('../Models/Kid');

// GET /bams
module.exports.GetBams = async (req, res) => {
    try {
        // get all bams in household
        const query = { householdId: req.user.householdId };
        // if kid, filter bams (or query) for the kid, or for unsassigned ones
        if (!req.user.isParent) {
            query.$or = [{assignee: "Unassigned"}, {assignee: req.user.id}]
        }
        const bams = await Bam.find(query);
        res.status(200).json(bams);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// PUT /bams/:bamId
// not currently implemented - needs parent check
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

// PUT /bams/:bamId/complete
module.exports.CompleteBam = async (req, res) => {
    try {
        const bamId = req.params.bamId;
        const bam = await Bam.findById(bamId);
        // if user is a parent, or the kid's id matches the bam assignee id, then update completed to true
        if (req.user.isParent || req.user.id === bam.assignee) {
            if (req.user.householdId === bam.householdId) {
                console.log("Updating Bam: " + bamId);
                update = await Bam.findByIdAndUpdate(bamId, {$set: {completed: true}});
                res.status(200).json(update);
            } else {
                res.status(404).json({error: "Bam not found"});
            }
        } else {
            res.status(403).json({error: "Not Authorized"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// PUT /bams/:banId/reset
module.exports.ResetBam = async (req, res) => {
    try {
        const bamId = req.params.bamId;
        const bam = await Bam.findById(bamId);
        // if user is a parent, or the kid's id matches the bam assignee id, then update completed to false
        if (req.user.isParent || req.user.id === bam.assignee) {
            if (req.user.householdId === bam.householdId) {
                console.log("Updating Bam: " + bamId);
                update = await Bam.findByIdAndUpdate(bamId, {$set: {completed: false}});
                res.status(200).json(update);
            } else {
                res.status(404).json({error: "Bam not found"});
            }
        } else {
            res.status(403).json({error: "Not Authorized"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// PUT /bams/:bamId/claim
module.exports.ClaimBam = async (req, res) => {
    try {
        // only kids can claim bams
        if (req.user.isParent) {
            res.status(403).json({error: "Only Kids can Claim Bams"});
        } else {
            const bamId = req.params.bamId;
            const kidId = req.user.id;
            const bam = await Bam.findById(bamId);
            // are we of the same household?
            if (req.user.householdId === bam.householdId) {
                // is it already assigned?
                if (bam.assignee === "Unassigned") {
                    console.log("Assigning Bam: " + bamId + " to " + kidId);
                    // findByIdAndUpdate returns original doc by default
                    const update = await Bam.findByIdAndUpdate(bamId, {$set: {assignee: kidId}}, {returnOriginal: false});
                    res.status(200).json(update);
                } else {
                    res.status(400).json({error: "Bam already assigned"});
                }
            } else {
                res.status(404).json({error: "Bam not found"});
            }
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
            console.log("Verified Bam: " + bam);
            // bam verified
            const verifiedBam = await Bam.findByIdAndUpdate(bamId, {verified: true});
            // add the points to the kid's doc
            const result = await Kid.findByIdAndUpdate(
                bam.assignee, 
                {$inc: {awardPoints: bam.points}}
            );
            console.log(result);
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
module.exports.DeleteBam = async (req, res) => {
    try {
        if (!req.user.isParent) {
            res.status(403).json({error: "Not Authorized."});
        } else {
            const bamId = req.params.bamId;
            const bam = await Bam.findById(bamId);
            // make sure we should be allowed to do this
            if (req.user.householdId === bam.householdId) {
                console.log("Deleting Bam: " + bamId);
                const update = await Bam.findByIdAndDelete(bamId);
                res.status(200).json(update);
            } else {
                res.status(404).json({error: "Bam not found."});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// POST /bams
module.exports.CreateBam = async (req, res) => {
    try {
        // create new bam
        req.body.householdId = req.user.householdId
        const newBam = await Bam.create(req.body);
        res.status(201).json(newBam);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}