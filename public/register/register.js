/*
 * File: register.js
 * Project: quizapp
 * File Created: Sunday, 19th April 2020 6:20:58 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

function getData() {
    const playerData = {
        userName: $('#userName').val(),
        age: $('#age').val(),
        // address: $("#address").val(),
        // user_id: $("#user_id").val(),
        password: $('#password').val(),
    };
    if (!playerData.userName || !playerData.age || !playerData.password) {
        swal('Oops!', 'Fill all the fields!', 'warning');
        return;
    }
    if (playerData.age < 3) {
        swal('Oops!', 'You must be old enough to play!', 'warning');
        return;
    }
    const postData = $.post('/register', playerData);
    console.log('############', playerData);
    postData.done((data) => {
        if (!data.success) {
            swal('Oops!', data.errorInfo, 'error');
            return;
        }
        swal('Yayy!', 'Registered Successfully!', 'success');
        text_clear();
        window.location.href = 'login.html';
    });
}

function text_clear() {
    document.getElementById('userName').value = '';
    document.getElementById('age').value = '';
    // document.getElementById("address").value = "";
    // document.getElementById("user_id").value = "";
    document.getElementById('password').value = '';
}
