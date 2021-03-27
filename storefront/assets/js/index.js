async function getProducts() {
    let response = await fetch('http://localhost:8000/products/');
    let data = await response.json();
    return data;
}
var productTable;
getProducts().then(data => {
    productTable = data;
    productTable = JSON.stringify(productTable);
})

var productPage = document.getElementById('productPage');
productPage.addEventListener('click', () => {
    var queryString = "?productTable=" + productTable;
    window.location.href = "products.html" + queryString;
});