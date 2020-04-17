/*
 * File: mongoConncetion.js
 * Project: jwttoken
 * File Created: Friday, 17th April 2020 3:30:49 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const { MongoClient } = require('mongodb');
const config = require('./config.js');

const dbs = {};

dbs.init = function init(callback) {
    const url = `mongodb://${config.host}:${config.port}`;
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, database) => {
        if (err) {
            console.log(err);
            console.log(`unable to connect Mongodb database on url: ${url}`);
            callback(err);
        } else {
            dbs.db = database.db(config.db_name);
            console.log(`Mongodb database connected to server on url: ${url}`);
        }
    });
};

module.exports = dbs;
