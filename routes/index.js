/*
 * File: index.js
 * Project: jwttoken
 * File Created: Friday, 17th April 2020 3:49:24 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */
const express = require('express');
const playerProfileHandler = require('../backendHandlers/playerProfileHandler.js');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.json({ title: 'Express' });
});

router.post('/register', (req, res) => {
    playerProfileHandler.registerUser(req, res);
});

router.post('/login', (req, res) => {
    playerProfileHandler.loginPlayer(req, res);
});

router.post('/auth/token', (req, res) => {
    authHandler.getRefreshToken(req, res);
});

router.delete('/logout', (req, res) => {
    authHandler.logout(req, res);
});

module.exports = router;
