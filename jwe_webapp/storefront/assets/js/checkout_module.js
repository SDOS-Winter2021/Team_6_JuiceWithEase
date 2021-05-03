import { check_pincode } from './exportfunctions.js';

const checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', checkoutButton_fnc);
function checkoutButton_fnc() {
    var checkoutObject;
    var temp;

    if (c == 0) {
        window.location.href = 'products.html';
    };

    window.sessionStorage.removeItem('foo');
    check_pincode(pincode.value).then( function(result){
        if(!result){
            window.sessionStorage.setItem('foo', "1");
            pincodeWarning.innerHTML = '*Delivery is not possible at your area!'; 
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        pincodeWarning.innerHTML = '*Delivery is not possible at your area!';
        window.sessionStorage.setItem('foo', "1");

    });
    if(window.sessionStorage.getItem('foo') == "1" ){
        window.sessionStorage.removeItem('foo');
        return;
    }
    
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
                    window.location.href = "login.html";
                } else {
                    //window.location.href = "user.html";
                    checkoutObject = {};
                    checkoutObject.shippingAddress = {}
                    checkoutObject.shippingAddress.address = address.value;
                    checkoutObject.shippingAddress.city = city.value;
                    checkoutObject.shippingAddress.pincode = pincode.value;
                    checkoutObject.order = {};
                    checkoutObject.order.paymentMethod = 'COD';
                    checkoutObject.order.datetime = datetime.value;
                    checkoutObject.orderItems = [];
                    for (var i in cartProducts) {
                        temp = [];
                        temp.push(cartProducts[i]['id']);
                        temp.push(cartProducts[i]['quantity']);
                        checkoutObject.orderItems.push(temp);
                    }
                    checkoutObject.user = {}
                    checkoutObject.user.access = window.localStorage.getItem('access');
                    checkoutObject.user.refresh = window.localStorage.getItem('refresh');
                    console.log(checkoutObject);
                    fetch('/orders/checkout/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem('access')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(checkoutObject),
                    })
                    .then(response => response.json())
                    .then(data => {
                        // localStorage.setItem('cartList', JSON.stringify(temp));
                        console.log(data['razorpay_orderID'])
                        
                        console.log('Success:', data);
                        localStorage.setItem('rorder_id', data['razorpay_orderID']);
                        localStorage.setItem('totalPrice', data['totalPrice']);
                        console.log("IN Local Storage: ");
                        console.log(localStorage.getItem('rorder_id'));
                        console.log(localStorage.getItem('totalPrice'));
                        localStorage['rorder_id'] = data['razorpay_orderID'];
                        window.location.href = "payment.html";
                    })
                    // .catch((error) => {
                    //     console.error('Error:', error);
                    // });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                window.location.href = "login.html";
            });
    } else {
        window.location.href = "login.html";
    }
};