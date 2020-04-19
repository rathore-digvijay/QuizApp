/*
 * File: registrationHandler.js
 * Project: quizapp
 * File Created: Friday, 17th April 2020 4:50:36 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const dbQuery = require('../../database/dbQuery.js');
const authHandler = require('./authHandler.js');

function getPlayerDetails(data) {
    const query = { userName: data.userName };
    return new Promise((resolve, reject) => {
        dbQuery.findUser(query, (err, player) => {
            if (err) {
                reject(new Error('Something bad happened'));
            } else {
                resolve(player);
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
    console.log('inside register user');
    console.log(JSON.stringify(req.body));
    try {
        const playerDetails = await getPlayerDetails(req.body);
        if (playerDetails) {
            throw new Error('User already exists with this username.');
        }
        await createPlayer(req.body);
        return res.json({ success: true, result: 'User Created' });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}

async function loginPlayer(req, res) {
    try {
        const playerDetails = await getPlayerDetails(req.body);
        if (!playerDetails) {
            throw new Error('No user found. Kindly register');
        }
        if (playerDetails.password !== req.body.password) {
            throw new Error('Incorrect Password.');
        }
        const user = { userName: playerDetails.userName };
        const accessToken = await authHandler.generateAccessToken(user);
        const refreshToken = await authHandler.generateRefreshToken(user);
        return res.json({
            success: true, user, accessToken, refreshToken,
        });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}


module.exports = {
    registerUser,
    loginPlayer,
};
