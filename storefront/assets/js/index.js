async function getProducts() {
    let response = await fetch('http://localhost:8000/products/');
    let data = await response.json();
    console.log(data);
    return data;
}
var productTable;
getProducts().then(data => {
    productTable = data;
    console.log(productTable);
    productTable = JSON.stringify(productTable);
    localStorage.setItem('productTable', productTable);
})

var productPage = document.getElementById('productPage');
productPage.addEventListener('click', () => {
    window.location.href = "products.html";
});

var userPage = document.getElementById('userPage');
userPage.addEventListener('click', () => {
    if (localStorage.getItem('access')) {
        fetch('http://localhost:8000/auth/jwt/verify/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token : localStorage.getItem('access')}),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data['code'] == "token_not_valid") {
                    window.location.href = "login.html";
                } else {
                    window.location.href = "user.html";
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                window.location.href = "login.html";
            });
    } else {
        window.location.href = "login.html";
    }
})