/*
 * File: mongoConncetion.js
 * Project: jwttoken
 * File Created: Friday, 17th April 2020 3:30:49 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const { MongoClient } = require('mongodb');
const config = require('./config.js');

// const url = `mongodb://${config.host}:${config.port}/${config.db_name}`;
const dbConnection = {};
// const connection = module.exports;

const dbs = {};

dbs.init = function init(callback) {
    // console.log(url);
    // MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, db) => {
    //     if (err) {
    //         console.log('Database Not Created!');
    //         callback(err);
    //     } else {
    //         callback(null);
    //         dbConnection.db = db;
    //         console.log('Database Created!');
    //     }
    // });

    const url = `mongodb://${config.host}:${config.port}`;
    const { name } = config.db_name;
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

// connection.getDb = function getDb() {
//     // if(dbConnection){
//     return dbConnection.db;
//     // }
// };

// connection.closeDb = function closeDb() {
//     if (dbConnection.db) {
//         dbConnection.db.close();
//     }
// };

module.exports = dbs;
