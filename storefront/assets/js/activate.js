const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');
const token = urlParams.get('token');
console.log(urlParams);
console.log(uid);
console.log(token);
activate = (e) => {
    e.preventDefault();
    var data = {
        'uid' : uid,
        'token' : token
    }
    fetch('/auth/users/activation/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.search("login.html");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}