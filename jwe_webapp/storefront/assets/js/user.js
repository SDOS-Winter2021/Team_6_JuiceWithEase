console.log(localStorage.getItem('access'));
console.log(localStorage.getItem('token'));
var count = document.getElementById('count');
if (count != null) {
    count.innerHTML = JSON.parse(localStorage.getItem('cartList')).length;
}
var numbernamee = document.getElementById('namee');
var email = document.getElementById('email');
var number = document.getElementById('number');
var address = document.getElementById('address');
var pincode = document.getElementById('pincode');

namee.setAttribute('value', 'Soumyadeep Paul');
email.setAttribute('value', 'soumyadeepsp@gmail.com');
number.setAttribute('value', '7042006372');
address.innerHTML = 'c-92, sector-04, Raurkela, Odisha';
pincode.setAttribute('value', '769002');

namee.setAttribute('readonly', 'True');
email.setAttribute('readonly', 'True');
number.setAttribute('readonly', 'True');
address.setAttribute('readonly', 'True');
pincode.setAttribute('readonly', 'True');

var edit = document.getElementById('edit');
var save = document.getElementById('save');
edit.addEventListener('click', () => {
    namee.removeAttribute('readonly');
    email.removeAttribute('readonly');
    number.removeAttribute('readonly');
    address.removeAttribute('readonly');
    pincode.removeAttribute('readonly');
});
save.addEventListener('click', () => {
    namee.setAttribute('readonly', 'True');
    email.setAttribute('readonly', 'True');
    number.setAttribute('readonly', 'True');
    address.setAttribute('readonly', 'True');
    pincode.setAttribute('readonly', 'True');
});

var homeButton = document.getElementById('home');
homeButton.addEventListener('click', () => {
    window.location.href = "index.html";
});