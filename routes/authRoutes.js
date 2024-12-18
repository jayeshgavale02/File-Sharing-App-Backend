const express = require('express');
const { signup, login , getProfileByEmail} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path as necessary

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile/email/:email', authMiddleware,getProfileByEmail);

module.exports = router;
