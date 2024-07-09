const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const User = require('../models/User');

// Get all candidates
router.get('/', async (req, res) => {
    try {
        let candidates = await Candidate.find({}, 'name party voteCount');
        candidates = candidates || [];

        res.render('votes.ejs', { candidates, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Vote for a candidate
// Vote for a candidate
router.post('/', async (req, res) => {
    const candidateID = req.body.candidateID; // Get candidate ID from form submission
    const userID = req.user._id; // Assuming req.user contains the logged-in user's ID

    try {
        const candidate = await Candidate.findById(candidateID);
        const user = await User.findById(userID);

        if (!candidate || !user) {
            return res.status(404).json({ message: 'Candidate or user not found' });
        }

        if (user.isVotedFor(candidateID)) {
            // User has already voted for this candidate, so unvote
            candidate.voteCount--;
            await candidate.save();

            user.unvote(candidateID);
            await user.save();

            return res.redirect('/votes');
        } else {
            // User is voting for the first time
            candidate.voteCount++;
            await candidate.save();

            user.vote(candidateID);
            await user.save();

            return res.redirect('/votes');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
