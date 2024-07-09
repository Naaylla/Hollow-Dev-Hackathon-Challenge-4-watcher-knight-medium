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

// Get details of a specific candidate
router.get('/:candidateID', async (req, res) => {
    const candidateID = req.params.candidateID;

    try {
        const candidate = await Candidate.findById(candidateID);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        res.status(200).json(candidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Vote for a candidate
router.post('/', async (req, res) => {
    const candidateID = req.body.candidateID;
    const candidate = await Candidate.findById(candidateID);

    if (candidate.isVoted) {
        return res.status(400).json({ message: 'You have already voted' });
    }

    // Record the vote
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    // Mark user as voted
    user.isVoted = true;
    await user.save();

    return res.redirect('/votes'); // Redirect to the votes page after voting
});

module.exports = router;
