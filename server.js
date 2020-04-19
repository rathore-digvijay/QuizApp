/*
* File: server.js
* Project: jwttoken
* File Created: Friday, 17th April 2020 12:17:38 pm
 * Author: digvijay (rathore.digvijay10@gmail.com)
 */

require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(express.json());

const posts = [
    {
        userName: 'A',
        title: 'POST 1',
    },
    {
        userName: 'B',
        title: 'POST 2',
    },
];

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

app.get('/posts', authenticateToken, (req, res) => res.json(posts.filter((post) => post.userName === req.user.name)));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// to get ramdomm token
// require('crypto').randomBytes(64).toString('hex');
