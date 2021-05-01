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
var warning = document.getElementById('warning');

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
};
