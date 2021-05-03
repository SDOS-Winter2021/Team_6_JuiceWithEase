var subtotal = document.getElementById('subtotal');
var total = document.getElementById('total');

var count = document.getElementById('count');
if (count != null) {
    count.innerHTML = JSON.parse(localStorage.getItem('cartList')).length;
}

var city = document.getElementById('city');
var pincode = document.getElementById('pincode');
var address = document.getElementById('address');

var datetime = document.getElementById('datetime');
var selecttime = document.getElementById('selecttime');
var warning = document.getElementById('warning');

var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd;
}
if(mm<10) {
    mm='0'+mm;
}
today = yyyy+'-'+mm+'-'+dd;
console.log(today);
datetime.setAttribute('min', today);

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
        if (userAddress.address && userAddress.address!="") {
            address.innerHTML = userAddress.address;
        }
        if (userAddress.city && userAddress.city!="") {
            city.innerHTML = userAddress.city;
        }
        if (userAddress.pinCode && userAddress.pinCode!="") {
            pincode.innerHTML = userAddress.pinCode;
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });

var pincodes;
fetch('/pincode/get_pincodes/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        pincodes = data;
    })
    .catch((error) => {
        console.log('Error:', error);
    });

function calculatePrice() {
    var c = 0;
    var arr = JSON.parse(localStorage.getItem('cartProducts'));
    for (var i in arr) {
        c = c + arr[i].quantity*arr[i].price;
    }
    return c;
}
var c = calculatePrice();

subtract = (e, id) => {
    var minus = e.target;
    var number = minus.parentElement.nextElementSibling;
    number = number.childNodes[0].innerHTML;
    var x = number;
    if (number > 1) {
        minus.parentElement.nextElementSibling.childNodes[0].innerHTML = number-1;
        var price = minus.parentElement.parentElement.previousElementSibling.childNodes[0].innerHTML;
        minus.parentElement.parentElement.previousElementSibling.childNodes[0].innerHTML = parseFloat(price)-parseFloat(price)/x;
        for (var i in cartProducts) {
            if (cartProducts[i]['id'] == id) {
                cartProducts[i]['quantity'] = parseInt(cartProducts[i]['quantity']) - 1;
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            }
        }
        c = parseFloat(c) - parseFloat(price)/x;
        total.innerHTML = c;
        subtotal.innerHTML = c;
    }
}

add = (e, id) => {
    var add = e.target;
    var number = add.parentElement.previousElementSibling;
    number = parseInt(number.childNodes[0].innerHTML);
    var x = number;
    add.parentElement.previousElementSibling.childNodes[0].innerHTML = number+1;
    var price = add.parentElement.parentElement.previousElementSibling.childNodes[0].innerHTML;
    add.parentElement.parentElement.previousElementSibling.childNodes[0].innerHTML = parseFloat(price) + parseFloat(price)/x;
    for (var i in cartProducts) {
        if (cartProducts[i]['id'] == id) {
            cartProducts[i]['quantity'] = parseInt(cartProducts[i]['quantity']) + 1;
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        }
    }
    c = parseFloat(c) + parseFloat(price)/x;
    total.innerHTML = c;
    subtotal.innerHTML = c;
}

del = (e, id) => {
    console.log(localStorage.getItem('cartList'));
    console.log(id);
    var temp = JSON.parse(localStorage.getItem('cartList'));
    var index = temp.indexOf(id);
    if (index > -1) {
        temp.splice(index, 1);
    }
    console.log(temp);
    localStorage.setItem('cartList', JSON.stringify(temp));
    var row = e.target.parentElement.parentElement.parentElement;
    for (var i in cartProducts) {
        if (cartProducts[i]['id'] == id) {
            cartProducts.splice(i, 1);
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        }
    }
    var count = document.getElementById('count');
    if (count != null) {
        count.innerHTML = JSON.parse(localStorage.getItem('cartList')).length;
    }
    row.remove();
    c = calculatePrice();
    total.innerHTML = c;
    subtotal.innerHTML = c;
}
  
  var product_categories = [{
    PulpyPure : 'Get the real pulp extracted from your favourite fruits. We ensure that the nutrient value of the juice is kept intact, so that you consume the best for your health. With no sugar, water, preservative or chemical in your juice, “Juice with ease” offers you the pure and pulpy juices.',
    DailyDetox : 'We understand what is best for your health because we care for you. Detoxifying your body helps in many ways, and at “Juice with ease” we have made it easy for you. Choose from wide range of our Daily Detoxifiers, and keep your mind, soul, and heart health.',
    DesiSplash : 'We bring the real Indian-ness in our brand by offering our customers a range of regional drinks famous in different parts of India. Enjoy these healthy beverages made from real fruit(s)/ or ingredients. No concentrates or artificial flavours are used.',
    ExoticDelight : 'There is a lot more to explore in healthy beverages, hence we offer you a selected range of juices made from “Exotic” fruits.  Enjoy the real taste of the fruit in its juicy form. Get health benefits from their nutrient contents (include antioxidant properties, have phytonutrients and others)'
  }]

var cartList = JSON.parse(localStorage.getItem('cartList'));
var products = JSON.parse(localStorage.getItem('products'));
var cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
console.log(cartProducts);

total.innerHTML = c;
subtotal.innerHTML = c;

var table = document.getElementsByClassName('list_of_products')[0];
for (var i in cartProducts) {
    table.innerHTML += `<tr>
        <th scope="row" class="border-0">
        <div class="p-2">
            <img aria-label="product-img" src="${cartProducts[i].image}" alt="" width="70" class="img-fluid rounded shadow-sm productPic">
            <div class="ml-3 d-inline-block align-middle">
            <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${cartProducts[i].name}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category: ${cartProducts[i].category}</span>
            <select name="volume" id="volume">
            <option value="300ml"><strong>300ml</strong></option>
            <option value="500ml"><strong>500ml</strong></option>
            </select>
            </div>
        </div>
        </th>
        <td class="border-0 align-middle"><strong class="itemCost">${cartProducts[i].price * cartProducts[i].quantity}</strong></td>
        <td class="border-0 align-middle">
        <span class="minus" onclick="subtract(event, ${cartProducts[i].id})"><strong>- &nbsp;&nbsp;</strong></span>
        <span><strong> ${cartProducts[i].quantity} </strong></span>
        <span class="plus" onclick="add(event, ${cartProducts[i].id})"><strong>&nbsp;&nbsp; +</strong></span>
        </td>
        <td class="border-0 align-middle"><a href="#" class="text-dark"><i class="fa fa-trash" onclick="del(event, ${cartProducts[i].id})"></i></a></td>
    </tr>`
}

function checkTime(userTime, userDate) {
    userDate = userDate.split("-");
    userDate = userDate[1]+'-'+userDate[2]+'-'+userDate[0];
    var date1 = new Date(userDate);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd;
    }
    if(mm<10) {
        mm='0'+mm;
    }
    today = mm+'-'+dd+'-'+yyyy;
    var date2 = new Date(today);
    console.log(today);
    console.log(userDate);
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Days);
    if (Difference_In_Days > 0) {
        return true;
    } else {
        var current = new Date();
        var hours = current.getHours()+1;
        var userHours = userTime.substring(0, 2);
        if (parseInt(userHours) - parseInt(hours) >= 6) {
            return true;
        } else {
            return false;
        }
    }
}

function checkPincode(pincode) {
    for (var i in pincodes) {
        if (pincodes[i]['pincode'] == pincode) {
            return true;
        }
    }
    return false;
}

var checkoutbtn = document.getElementsByClassName('checkoutbtn')[0];
console.log(checkoutbtn);
checkoutbtn.addEventListener('click', () => {
    if (c == 0) {
        alert("Your cart is empty!");
        window.location.href = 'products.html';
        return;
    }
    if (!checkPincode(pincode.value)) {
        pincodeWarning.innerHTML = '* Delivery is not possible at your area!';
        return;
    }
    if (!checkTime(selecttime.value, datetime.value)) {
        alert ("Delivery time should be atleast 6 hours from your current time!");
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
                    console.log(JSON.stringify(checkoutObject));
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
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                window.location.href = "login.html";
            });
    } else {
        window.location.href = "login.html";
    }
});