/*
 * File: home.js
 * Project: quizapp
 * File Created: Sunday, 19th April 2020 7:31:51 pm
 * Author: digvijay (rathore.digvijay10@gmail.com)
 */

console.log('here data is');

function checkAnyOneLogin(params) {

}
checkAnyOneLogin();

function playerProfile() {
    swal('Coming Soon!', 'come back later');
    // window.location.href = 'insert_student_details.html';
}

function playMcq() {
    return window.location.assign('../mcqGame/game.html');
}

function playTF() {
    swal('Coming Soon!', 'come back later');
    // window.location.href = 'show_students_list.html';
}

function checkStats() {
    swal('Coming Soon!', 'come back later');
}

function logOut() {
    window.location.href = 'login.html';
}
