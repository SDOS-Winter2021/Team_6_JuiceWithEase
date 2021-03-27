var c = 0;
var subtotal = document.getElementById('subtotal');
var total = document.getElementById('total');

subtract = (e) => {
    var minus = e.target;
    var number = minus.parentElement.nextElementSibling;
    number = number.childNodes[0].innerHTML;
    var x = number;
    if (number > 1) {
        minus.parentElement.nextElementSibling.childNodes[0].innerHTML = number-1;
        var price = minus.parentElement.parentElement.previousElementSibling.childNodes[0].innerHTML;
    minus.parentElement.parentElement.previousElementSibling.childNodes[0].innerHTML = parseFloat(price)-parseFloat(price)/x;
    }
}

add = (e) => {
    var add = e.target;
    var number = add.parentElement.previousElementSibling;
    number = parseInt(number.childNodes[0].innerHTML);
    var x = number;
    add.parentElement.previousElementSibling.childNodes[0].innerHTML = number+1;
    var price = add.parentElement.parentElement.previousElementSibling.childNodes[0].innerHTML;
    add.parentElement.parentElement.previousElementSibling.childNodes[0].innerHTML = parseFloat(price) + parseFloat(price)/x;
}

del = (e, id) => {
    console.log(localStorage.getItem('cartList'));
    console.log(id);
    var temp = JSON.parse(localStorage.getItem('cartList'));
    var index = temp.indexOf(id);
    if (index > -1) {
        temp.splice(index, 1);
    }
    localStorage.setItem('cartList', JSON.stringify(temp));
    var row = e.target.parentElement.parentElement.parentElement;
    row.remove();
}

// var products = [{
//     id : '1',
//     name : 'Orange Juice',
//     category : 'pulpyPure',
//     price : '97',
//     bottle_type : '300ml',
//     description : ''
//   }, {
//     id : '2',
//     name : 'Red Juice',
//     category : 'dailyDetox',
//     price : '217',
//     bottle_type : '500ml',
//     description : 'Beet root + Carrot + Ginger + Lemon + Apple + Chia Seeds + Flax Seeds'
//   }, {
//     id : '3',
//     name : 'Ginger Mint Lemon(From East)',
//     category : 'desiSplash',
//     price : '67',
//     bottle_type : '300ml',
//     description : ''
//   }, {
//     id : '4',
//     name : 'Beet Root',
//     category : 'pulpyPure',
//     price : '97',
//     bottle_type : '300ml',
//     description : ''
//   }, {
//     id : '5',
//     name : 'Red Juice',
//     category : 'dailyDetox',
//     price : '217',
//     bottle_type : '300ml',
//     description : 'Beet root + Carrot + Ginger + Lemon + Apple + Chia Seeds + Flax Seeds'
//   }, {
//     id : '6',
//     name : 'Ginger Mint Lemon(From East)',
//     category : 'pulpyPure',
//     price : '67',
//     bottle_type : '300ml',
//     description : ''
//   }, {
//     id : '7',
//     name : 'Blueberry',
//     category : 'exoticDelight',
//     price : '97',
//     bottle_type : '300ml',
//     description : ''
//   }, {
//     id : '8',
//     name : 'Red Juice',
//     category : 'dailyDetox',
//     price : '217',
//     bottle_type : '300ml',
//     description : 'Beet root + Carrot + Ginger + Lemon + Apple + Chia Seeds + Flax Seeds'
//   }, {
//     id : '9',
//     name : 'Ginger Mint Lemon(From East)',
//     category : 'desiSplash',
//     price : '67',
//     bottle_type : '300ml',
//     description : ''
//   }, {
//     id : '10',
//     name : 'Ginger Mint Lemon(From East)',
//     category : 'desiSplash',
//     price : '97',
//     bottle_type : '300ml',
//     description : ''
//   }, {
//     id : '11',
//     name : 'Blueberry',
//     category : 'exoticDelight',
//     price : '217',
//     bottle_type : '300ml',
//     description : 'Beet root + Carrot + Ginger + Lemon + Apple + Chia Seeds + Flax Seeds'
//   }
//   ]
  
  var product_categories = [{
    PulpyPure : 'Get the real pulp extracted from your favourite fruits. We ensure that the nutrient value of the juice is kept intact, so that you consume the best for your health. With no sugar, water, preservative or chemical in your juice, “Juice with ease” offers you the pure and pulpy juices.',
    DailyDetox : 'We understand what is best for your health because we care for you. Detoxifying your body helps in many ways, and at “Juice with ease” we have made it easy for you. Choose from wide range of our Daily Detoxifiers, and keep your mind, soul, and heart health.',
    DesiSplash : 'We bring the real Indian-ness in our brand by offering our customers a range of regional drinks famous in different parts of India. Enjoy these healthy beverages made from real fruit(s)/ or ingredients. No concentrates or artificial flavours are used.',
    ExoticDelight : 'There is a lot more to explore in healthy beverages, hence we offer you a selected range of juices made from “Exotic” fruits.  Enjoy the real taste of the fruit in its juicy form. Get health benefits from their nutrient contents (include antioxidant properties, have phytonutrients and others)'
  }]

var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");
//var cartList = queries[0].substring(9,).split(',');
var products = JSON.parse(queries[1].substring(9,));
//var cartList = queryString.substring(9,).split(',');
var cartList = JSON.parse(localStorage.getItem('cartList'));
console.log(cartList);
console.log(products);

cartProducts = []
for (var i in cartList) {
    for (var j in products) {
        if (products[j].id == cartList[i]) {
            cartProducts.push(products[j]);
        }
    }
}
console.log(cartProducts);

var table = document.getElementsByClassName('list_of_products')[0];
for (var i in cartProducts) {
    table.innerHTML += `<tr>
        <th scope="row" class="border-0">
        <div class="p-2">
            <img src="${cartProducts[i].image}" alt="" width="70" class="img-fluid rounded shadow-sm productPic">
            <div class="ml-3 d-inline-block align-middle">
            <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${cartProducts[i].name}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category: ${cartProducts[i].category}</span>
            <select name="volume" id="volume">
            <option value="300ml"><strong>300ml</strong></option>
            <option value="500ml"><strong>500ml</strong></option>
            </select>
            </div>
        </div>
        </th>
        <td class="border-0 align-middle"><strong>${cartProducts[i].price}</strong></td>
        <td class="border-0 align-middle">
        <span class="minus" onclick="subtract(event)"><strong>- &nbsp;&nbsp;</strong></span>
        <span><strong> 1 </strong></span>
        <span class="plus" onclick="add(event)"><strong>&nbsp;&nbsp; +</strong></span>
        </td>
        <td class="border-0 align-middle"><a href="#" class="text-dark"><i class="fa fa-trash" onclick="del(event, ${cartProducts[i].id})"></i></a></td>
    </tr>`
}