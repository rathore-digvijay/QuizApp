/*
 * File: authHandler.js
 * Project: quizapp
 * File Created: Friday, 17th April 2020 4:42:36 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */
require('dotenv').config();

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    // synchronous
    // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
    // asynchronous
    return new Promise((resolve, reject) => {
        jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' }, (err, accessToken) => {
            if (err) {
                reject(new Error('Error while generating accessToken'));
            }
            resolve(accessToken);
        });
    });
}

function generateRefreshToken(user) {
    return new Promise((resolve, reject) => {
        jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, (err, refreshToken) => {
            if (err) {
                reject(new Error('Error while generating refreshToken'));
            }
            resolve(refreshToken);
        });
    });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
