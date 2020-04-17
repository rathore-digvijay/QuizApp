/*
 * File: auth.js
 * Project: jwttoken
 * File Created: Friday, 17th April 2020 3:49:31 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */
const express = require('express');
const authHandler = require('../backendHandlers/authHandler.js');

const router = express.Router();

router.post('/auth/token', (req, res) => {
    authHandler.getRefreshToken(req, res);
});

router.delete('/logout', (req, res) => {
    authHandler.logout(req, res);
});

router.post('/login', (req, res) => {
    authHandler.login(req, res);
});

module.exports = router;
