/*
 * File: dbQuery.js
 * Project: jwttoken
 * File Created: Friday, 17th April 2020 3:48:09 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const mongodb = require('./mongoConnection.js');

const remote = {};


// query to get particular user details
remote.findUser = function findUser(query, callback) {
    mongodb.db.collection('players').findOne(query, (err, result) => {
        callback(err, result);
    });
};

remote.createPlayer = function createPlayer(data, callback) {
    mongodb.db.collection('players').insertOne(data, (err, result) => {
        callback(err, result);
    });
};

module.exports = remote;
