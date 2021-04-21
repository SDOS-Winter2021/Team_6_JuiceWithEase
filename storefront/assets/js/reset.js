var newPassword = document.getElementById('new-password');
var confirmPassword = document.getElementById('confirm-password');

reset = (e) => {
    e.preventDefault();
    const data = {
        uid : 'uid',
        token : 'token',
        new_password : newPassword.value,
        re_new_password : confirmPassword.value
    }
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}