var namee = document.getElementById('name');
var email = document.getElementById('email');
var mobile = document.getElementById('mobile');
var password = document.getElementById('password');
var confirm_password = document.getElementById('confirm_password');

signup = (e) => {
    e.preventDefault();
    if (namee.contains(" ")) {
        var temp = namee.split(" ");
        var first_name = temp[0];
        temp.shift();
        var last_name = temp.join().replace(',', " ");
        var data = {
            'first_name' : first_name,
            'last_name' : last_name,
            'email' : email.value,
            'phone' : mobile.value,
            'password' : password.value,
            're_password' : confirm_password.value
        };
    } else {
        var data = {
            'first_name' : namee.value,
            'last_name' : "",
            'email' : email.value,
            'phone' : mobile.value,
            'password' : password.value,
            're_password' : confirm_password.value
        };
    }
    console.log(data);
    fetch('/auth/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(alert("An activation mail has been sent to your email Id. Please Activate your account."))
        .then(data => {
            console.log('Success:', data);
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}