const API_BASE_URL = "http://localhost:5233/api/products";

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

let products = [];

async function loadProducts() {
    try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
            throw new Error("Could not load products");
        }

        products = await response.json();

        displayProducts(products);

    } catch (error) {
        productList.innerHTML =
            "<p>Unable to load products. Check your API connection.</p>";

        console.error(error);
    }
}

function displayProducts(items) {
    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach(product => {
        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ₦${Number(product.price).toLocaleString()}</p>
        `;

        productList.appendChild(card);
    });
}

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    displayProducts(filteredProducts);
});

loadProducts();
