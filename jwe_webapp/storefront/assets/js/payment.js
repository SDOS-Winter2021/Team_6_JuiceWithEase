console.log(localStorage['rorder_id'])
console.log(localStorage['email'])
console.log(localStorage.getItem('rorder_id'));
console.log(localStorage.getItem('totalPrice'));
var rpay_payment_id ;
var rpay_order_id ;
var rpay_signature ;
var payment_response ;
var options = {
"key": "rzp_test_VWf3ZGDjgj2udL", // Enter the Key ID generated from the Dashboard
"amount": localStorage.getItem('totalPrice'), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
"currency": "INR",
"name": "Juice with Ease",
"description": "Juice With Ease",
"image": "https://example.com/your_logo",
"order_id": localStorage.getItem('rorder_id'), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
"handler": function (response){
    payment_obj = {}
    //alert(response.razorpay_payment_id);
    rpay_payment_id = response.razorpay_payment_id;
    // alert(response.razorpay_order_id);
    rpay_order_id = response.razorpay_order_id
    //alert(response.razorpay_signature);
    rpay_signature = response.razorpay_signature
    payment_response = {'rpay_payment_id' : rpay_payment_id, 
                        'rpay_order_id':rpay_order_id,
                        'rpay_signature':rpay_signature,
                        'Order_ID':localStorage.getItem('rorder_id')} ;
    console.log(response);
    console.log(payment_response);
    payment_obj.rpay_payment_id = rpay_payment_id;
    payment_obj.rpay_order_id = rpay_order_id;
    payment_obj.rpay_signature = rpay_signature;
    payment_obj.Order_ID = localStorage.getItem('rorder_id');

    fetch('/orders/payment_verify/', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment_obj),
    
    })
    .then(response => response.json())
    .then(alert("Your Payment was Successfull. You'll be redirected to the homepage now!"))
    //.then(window.location.href = "http://localhost:8080/")
    .then(data => {
        // localStorage.setItem('cartList', JSON.stringify(temp));
        // console.log(data['razorpay_orderID'])
        // alert("Your Payment was Successfull. You'll be redirected to the homepage now!");
        console.log('Success:', data);
        // localStorage.setItem('order_id', data['razorpay_orderID']);
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.error("Error Occured",error);
    });

},
"prefill": {
    "name": localStorage.getItem('email'),
    "email": localStorage.getItem('email'),
    "contact": "9999999999"
},
"notes": {
    "address": "Razorpay Corporate Office"
},
"theme": {
    "color": "#3399cc"
}
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
});
document.getElementById('rzp-button1').onclick = function(e){
rzp1.open();
e.preventDefault();
}