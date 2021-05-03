console.log(localStorage.getItem('access'));
console.log(localStorage.getItem('token'));
var count = document.getElementById('count');
if (count != null) {
    count.innerHTML = JSON.parse(localStorage.getItem('cartList')).length;
}
var namee = document.getElementById('namee');
var email = document.getElementById('email');
var number = document.getElementById('number');
var address = document.getElementById('address');
var city = document.getElementById('city');
var pincode = document.getElementById('pincode');
var allProducts = JSON.parse(localStorage.getItem('allProducts'));
console.log(allProducts);

function getHtmlSnippet(orderItems) {
    var html = ``;
    // <tr>
    //     <td><img class="productPic" src="https://letsimagine.in/wp-content/uploads/2017/10/what-a-melon-1.png"/></td>
    //     <td>Melon Juice</td>
    //     <td>2</td>
    //     <td>180</td>
    // </tr>
    var orderItemDetails = [];
    for (var i in orderItems) {
        for (var j in allProducts) {
            if (orderItems[i]['product'] == allProducts[j]['id']) {
                temp = {};
                temp.image = allProducts[j]['image'];
                temp.name = allProducts[j]['name'];
                temp.quantity = orderItems[i]['qty'];
                temp.price = orderItems[i]['price'];
                orderItemDetails.push(temp);
            }
        }
    }
    for (var i in orderItemDetails) {
        html += `
        <tr>
            <td><img class="productPic" src="${orderItemDetails[i].image}"/></td>
            <td>${orderItemDetails[i].name}</td>
            <td>${orderItemDetails[i].quantity}</td>
            <td>${orderItemDetails[i].price}</td>
        </tr>`
    }
    return html;
}

var userDetails;
var userAddress;
var orders;
if (localStorage.getItem('access')) {
    fetch('/auth/jwt/verify/', {
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
                console.log('token not valid: ', data);
            } else {
                fetch('/auth/users/me/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('access')}`,
                    'Content-Type': 'application/json',
                },
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    userDetails = data;
                    namee.setAttribute('value', `${userDetails.first_name} ${userDetails.last_name}`);
                    email.setAttribute('value', userDetails.email);
                    number.setAttribute('value', userDetails.phone);
                    var welcome = document.getElementById('welcome');
                    welcome.innerHTML = userDetails.first_name;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
                fetch('/accounts/user/address/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem('access')}`,
                        'Content-Type': 'application/json',
                    },
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        userAddress = data;
                        address.innerHTML = userAddress.address;
                        city.setAttribute('value', userAddress.city);
                        pincode.setAttribute('value', userAddress.pinCode);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                    fetch('/orders/myorders/', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem('access')}`,
                            'Content-Type': 'application/json',
                        },
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            orders = data;
                            var table = document.getElementById('user-profile-examples');
                             orderProducts = orders;

                             for (var i in orderProducts) {
                                 console.log('hello');
                                table.innerHTML += `<table>
                                <caption>${orderProducts[i]['createdAt'].substring(0, 10)}</caption>
                                <tr>
                                   <th>Product</th>
                                   <th>Item name</th>
                                   <th>Quantity</th>
                                   <th>Price</th>
                                </tr>
                                ${getHtmlSnippet(orderProducts[i]['orderItems'])}
                             </table>`
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

namee.setAttribute('readonly', 'True');
email.setAttribute('readonly', 'True');
number.setAttribute('readonly', 'True');
address.setAttribute('readonly', 'True');
city.setAttribute('readonly', 'True');
pincode.setAttribute('readonly', 'True');

var edit = document.getElementById('edit');
var save = document.getElementById('save');
edit.addEventListener('click', () => {
    address.removeAttribute('readonly');
    city.removeAttribute('readonly');
    pincode.removeAttribute('readonly');
});
save.addEventListener('click', () => {
    address.setAttribute('readonly', 'True');
    city.setAttribute('readonly', 'True');
    pincode.setAttribute('readonly', 'True');
    var newAddress = {}
    newAddress.address = address.value;
    newAddress.city = city.value;
    newAddress.pincode = pincode.value;
    fetch('/accounts/user/address/', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            userAddress = data;
            address.innerHTML = userAddress.address;
            city.setAttribute('value', userAddress.city);
            pincode.setAttribute('value', userAddress.pinCode);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

var homeButton = document.getElementById('home');
homeButton.addEventListener('click', () => {
    window.location.href = "index.html";
});