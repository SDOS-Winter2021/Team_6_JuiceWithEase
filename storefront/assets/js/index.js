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

function setWithExpiry(key, value, ttl) {
	const now = new Date()
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

var popup_model = document.querySelector('.popup-modal');
var popup_tick = document.querySelector('.popup-result-tick');
var popup_error = document.querySelector('.popup-result-error');
var main_layout = document.querySelector('.main-layout');
pincode_list = ["11096", "201010"];

//Show Popup on first visit to the page, expiry every 100 hours
$(document).ready(function () {
    if (getWithExpiry('Pincode_Popup') !== 'true') {
        popup_model.style.display = "flex";
        main_layout.style.overflow = 'hidden';
    }
    setWithExpiry('Pincode_Popup', 'true', 360000000);
});

document.querySelector('.carousal-pincode').addEventListener("click", function() {
    popup_model.style.display = "flex";
    main_layout.style.overflow = 'hidden';
});

//Popup close
document.querySelector('.popup-close').addEventListener("click", function () {
    document.getElementById("pincode").value = "";
    popup_error.style.display = "none";
    popup_tick.style.display = "none";
    popup_model.style.display = "none";
    main_layout.style.overflow = 'visible';


});

//Handle Popup Submit 
const form = document.querySelector('.pincode-form')
form.addEventListener('submit', event => {
    var pincode = document.getElementById("pincode").value;
    if (pincode_list.includes(pincode)) {
        popup_error.style.display = "none";
        popup_tick.style.display = "flex";
} else {
        popup_error.style.display = "flex";
        popup_tick.style.display = "none";
    }
    setTimeout(function () {
        document.getElementById("pincode").value = "";
        popup_error.style.display = "none";
        popup_tick.style.display = "none";
        popup_model.style.display = "none";
        main_layout.style.overflow = 'visible';
    }, 1200)
    event.preventDefault();
})
