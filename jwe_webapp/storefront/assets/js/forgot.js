var email = document.getElementById('email');

sendMail = (e) => {
    console.log(email);
    console.log(email.value);
    e.preventDefault();
    fetch('/auth/users/reset_password/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email : email.value,}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}