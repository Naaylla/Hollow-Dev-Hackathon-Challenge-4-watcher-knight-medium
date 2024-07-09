const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

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

router.get('/:id', async (req, res) => {
    const candidateID = req.params.id;

    try {
        let candidate = await Candidate.findById(candidateID);

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.json(candidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const candidateID = req.body.candidateID;
    const userID = req.user._id; // Assuming you have user ID in req.user

    try {
        // Check if the user has already voted for this candidate
        const candidate = await Candidate.findById(candidateID);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        // Check if the user has already voted for this candidate
        const alreadyVoted = candidate.votes.some(vote => vote.user.equals(userID));
        if (alreadyVoted) {
            return res.status(400).json({ error: 'You have already voted for this candidate' });
        }

        // Record the user's vote for the candidate
        candidate.votes.push({ user: userID });
        candidate.voteCount++;
        await candidate.save();

        res.status(200).json({ message: 'Vote counted successfully', candidate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
