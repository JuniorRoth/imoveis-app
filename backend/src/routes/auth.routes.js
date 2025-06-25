const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller');

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

module.exports = router;
