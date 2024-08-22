const login = require('../controllers/auth/login');
const register = require('../controllers/auth/register');
const express = require('express');
const router = express.Router();


// login route
router.post('/login',login);

// register route

router.post('/register',register);

module.exports = router;