const express = require('express');
const router = express.Router();
const execute = require('../controllers/run/execute');


// login route
router.post('/run',execute);

// register route



module.exports = router;