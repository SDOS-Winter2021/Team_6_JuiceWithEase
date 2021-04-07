var email = document.getElementById('email');
var password = document.getElementById('password');
var login = document.getElementById('login');

loginButton = (e) => {
    e.preventDefault();
    console.log(email.value);
    console.log(password.value);
    var data = {email : email.value, password : password.value};
    var e = email.value
    fetch('http://localhost:8000/auth/jwt/create/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data['refresh'] && data['access']) {
            window.localStorage.setItem('refresh', data['refresh']);
            window.localStorage.setItem('access', data['access']);
            window.localStorage.setItem('email', e);
            window.location.href = "user.html";
        } else {
            window.location.href = "register.html";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}