/*
 * File: tokenChecker.js
 * Project: quizapp
 * File Created: Saturday, 18th April 2020 7:59:48 pm
 * Author: digvijay (rathore.digvijay10@gmail.com)
 */

const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: true, message: 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            error: true,
            message: 'No token provided.',
        });
    }
};
