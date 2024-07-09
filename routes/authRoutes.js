const express = require('express');
const router = express.Router();
const loginRoutes = require('./loginRoutes');
const registerRoutes = require('./registerRoutes');
const homeRoutes = require('./homeRoutes');
const logoutRoutes = require('./logoutRoutes');

router.use('/', loginRoutes);
router.use('/register', registerRoutes);
router.use('/home', homeRoutes);
router.use('/logout', logoutRoutes);

module.exports = router;
