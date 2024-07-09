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

    const candidate = await Candidate.findById(candidateID);

    candidate.voteCount++;
    await candidate.save();

    res.status(200).json({ message: 'Vote counted successfully', candidate });

});


module.exports = router;
