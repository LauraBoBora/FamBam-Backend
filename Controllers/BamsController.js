const Bam = require('../Models/Bam');
const Kid = require('../Models/Kid');

// GET /bams
module.exports.GetBams = async (req, res) => {
    try {
        const query = { householdId: req.user.householdId };
        if (!req.user.isParent) {
            query.$or = [{assignee: "Unassigned"}, {assignee: req.user.id}]
        }
        console.log(query);
        const bams = await Bam.find(query);
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

module.exports.CompleteBam = async (req, res) => {
    try {
        const bamId = req.params.bamId;
        const bam = await Bam.findById(bamId);
        if (bam.assignee === "Unassigned" || req.user.isParent || req.user.id === bam.assignee) {
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

module.exports.ResetBam = async (req, res) => {
    try {
        const bamId = req.params.bamId;
        const bam = await Bam.findById(bamId);
        if (bam.assignee === "Unassigned" || req.user.isParent || req.user.id === bam.assignee) {
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
            // Add the points to the kid's doc
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
// todo: user.isParent check?
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
        // console.log(req.body);
        const newBam = await Bam.create(req.body);
        // console.log(newBam);
        res.status(201).json(newBam);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
