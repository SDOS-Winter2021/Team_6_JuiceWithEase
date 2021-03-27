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
})

var productPage = document.getElementById('productPage');
productPage.addEventListener('click', () => {
    var queryString = "?productTable=" + productTable;
    window.location.href = "products.html" + queryString;
});