var newPassword = document.getElementById('new-password');
var confirmPassword = document.getElementById('confirm-password');

const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');
const token = urlParams.get('token');
console.log(uid);
console.log(token);

reset = (e) => {
    e.preventDefault();
    console.log(newPassword.value);
    console.log(confirmPassword.value);
    if (newPassword.value != confirmPassword.value) {
        alert("The passwords don't match");
        return;
    }
    const data = {
        uid : uid,
        token : token,
        new_password : newPassword.value,
        re_new_password : confirmPassword.value
    }
    console.log(data);
    fetch('/auth/users/reset_password_confirm/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            window.location.href = "login.html";
        });
}