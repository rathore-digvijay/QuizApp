/*
 * File: index.js
 * Project: jwttoken
 * File Created: Friday, 17th April 2020 3:49:24 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */
const express = require('express');
const registrationHandler = require('../backendHandlers/registrationHandler.js');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.json({ title: 'Express' });
});

router.post('/register', (req, res) => {
    registrationHandler.registerUser(req, res);
});

module.exports = router;
