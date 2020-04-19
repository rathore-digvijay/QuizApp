/*
 * File: serverCopy.js
 * Project: jwttoken
 * File Created: Friday, 17th April 2020 1:01:54 pm
 * Author: digvijay (rathore.digvijay10@gmail.com)
 */

require('dotenv').config();

const express = require('express');

const app = express();
const jwt = require('jsonwebtoken');

const port = 4000;

app.use(express.json());

const refreshTokens = [];

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken === null) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = generateAccessToken({ name: user.name });
        return res.json({ accessToken });
    });
});

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
});

app.post('/login', (req, res) => {
    // Authenticate User
    const { userName } = req.body;
    const user = { name: userName };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
    // res.json({ accessToken: accessToken, refreshToken: refreshToken});
});

function generateAccessToken(user) {
    // synchronous
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
    // asynchronous
    // jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' }, (err, accessToken) => accessToken);
}

function generateRefreshToken(user) {
    // synchronous
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    // asynchronous
    // jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, (err, refreshToken) => refreshToken);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// to get ramdomm token
// require('crypto').randomBytes(64).toString('hex');
