const express = require('express');
const router = express.Router();
const loginRoutes = require('./loginRoutes');
const registerRoutes = require('./registerRoutes');
const userRoutes = require('./userRoutes');
const logoutRoutes = require('./logoutRoutes');

router.use('/', loginRoutes);
router.use('/register', registerRoutes);
router.use('/user', userRoutes);
router.use('/logout', logoutRoutes);

module.exports = router;
