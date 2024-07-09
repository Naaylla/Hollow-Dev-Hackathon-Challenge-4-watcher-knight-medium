const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const User = require('../models/User');

// Middleware to check admin role
const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID);
        return user && user.role === 'admin';
    } catch (err) {
        console.error('Error checking admin role:', err);
        return false;
    }
};

// Admin panel route
router.get('/', async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        const candidates = await Candidate.find();
        res.render("admin.ejs", { user: req.user, message: null });
    } catch (err) {
        console.error('Error fetching candidates:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add candidate page
router.get('/add', async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        res.render("add.ejs", { user: req.user, message: null });
    } catch (err) {
        console.error('Error rendering add candidate page:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update candidate page
router.get('/update', async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        const candidates = await Candidate.find();
        res.render("update.ejs", { candidates: candidates, user: req.user, message: null });
    } catch (err) {
        console.error('Error rendering update candidate page:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete candidate page
router.get('/delete', async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        const candidates = await Candidate.find();
        res.render("delete.ejs", { candidates: candidates, user: req.user, message: null });
    } catch (err) {
        console.error('Error rendering delete candidate page:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add candidate route
router.post('/add', async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        const { candidateID, party } = req.body;
        const existingUser = await User.findById(candidateID);

        if (!existingUser) {
            return res.render("add.ejs", { user: req.user, message: 'User with the provided ID does not exist' });
        }

        const existingCandidate = await Candidate.findOne({ user: candidateID });
        if (existingCandidate) {
            return res.render("add.ejs", { user: req.user, message: 'Candidate already exists' });
        }

        if (existingUser.role === 'admin') {
            return res.render("add.ejs", { user: req.user, message: 'An admin cannot be a candidate' });
        }

        const newCandidate = new Candidate({ user: candidateID, party });
        const response = await newCandidate.save();
        console.log('New candidate created');
        res.render("add.ejs", { user: req.user, message: 'Candidate added successfully' });

    } catch (err) {
        console.error('Error adding candidate:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update candidate route
router.post('/update', async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        const { candidateID, party } = req.body;
        const updatedCandidate = await Candidate.findByIdAndUpdate(candidateID, { party }, { new: true });

        if (!updatedCandidate) {
            return res.render("update.ejs", { candidates: await Candidate.find(), user: req.user, message: 'Candidate not found' });
        }

        console.log('Candidate updated');
        res.render("update.ejs", { candidates: await Candidate.find(), user: req.user, message: 'Candidate updated successfully' });

    } catch (err) {
        console.error('Error updating candidate:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete candidate route
router.post('/delete', async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        const { candidateID } = req.body;
        const deletedCandidate = await Candidate.findByIdAndDelete(candidateID);

        if (!deletedCandidate) {
            return res.render("delete.ejs", { candidates: await Candidate.find(), user: req.user, message: 'Candidate not found' });
        }

        console.log('Candidate deleted');
        res.render("delete.ejs", { candidates: await Candidate.find(), user: req.user, message: 'Candidate deleted successfully' });

    } catch (err) {
        console.error('Error deleting candidate:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
