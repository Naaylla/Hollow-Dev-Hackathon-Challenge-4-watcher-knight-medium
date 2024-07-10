const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String
    },
    votes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    voteCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
