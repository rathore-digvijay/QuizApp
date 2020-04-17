/*
 * File: registrationHandler.js
 * Project: quizapp
 * File Created: Friday, 17th April 2020 4:50:36 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const dbQuery = require('../database/dbQuery.js');

function checkUserExist(data) {
    const query = { userName: data.userName };
    return new Promise((resolve, reject) => {
        dbQuery.findUser(query, (err, user) => {
            if (err) {
                reject(new Error('Something bad happened'));
            } else if (user.length > 0) {
                reject(new Error('User Already Exist'));
            } else {
                resolve('No user Exist');
            }
        });
    });
}

function createPlayer(data) {
    const playerData = { userName: data.userName, password: data.password };
    return new Promise((resolve, reject) => {
        dbQuery.createPlayer(playerData, (err, player) => {
            if (err) {
                reject(new Error('Error while creating Player'));
            } else {
                resolve(player);
            }
        });
    });
}

async function registerUser(req, res) {
    try {
        await checkUserExist(req.body);
        await createPlayer(req.body);
        return res.json({ success: true, result: 'User Created' });
    } catch (error) {
        console.trace(error);
        return res.json({ success: false, errorInfo: 'error' });
    }
}


module.exports = {
    registerUser,
};
