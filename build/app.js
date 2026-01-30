// Cek login segera saat script dimuat
const currentUser = JSON.parse(localStorage.getItem("user"));
const currentPath = window.location.pathname.toLowerCase();
const isLoginPage = currentPath.includes('login.html') || currentPath.endsWith('/') || currentPath === '';

console.log("Pathname:", currentPath); // Debug
console.log("Is login page:", isLoginPage); // Debug
console.log("User logged in:", !!currentUser); // Debug

// Jika belum login dan bukan di halaman login, redirect ke login
if (!currentUser && !isLoginPage) {
    console.log("Redirecting to login - protected page accessed without login"); // Debug
    window.location.href = 'login.html';
}

// Fungsi global untuk login dari onclick
function doLogin() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (username === "user" && password === "user") {
        // Login berhasil
        localStorage.setItem("user", JSON.stringify({ username }));
        message.textContent = "Login berhasil! Mengalihkan...";
        message.className = "message success";

                // Force redirect dengan URL lengkap untuk localhost
                setTimeout(() => {
                    window.location.href = "http://localhost/sepatu_project/index.html";
                }, 500);
    } else {
        message.textContent = "Username atau password salah.";
        message.className = "message error";
    }
}

// Inisialisasi login
document.addEventListener('DOMContentLoaded', function() {
    updateNav();
    handleLoginForm();

    // Render halaman hanya jika user sudah login
    if (currentUser) {
        renderProducts();
        renderCart();
        renderCheckout();
    }
});

// Data produk sepatu
const products = [
    { id: 1, name: "Sepatu Sneakers", price: 500000, image: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=300&h=200&fit=crop" },
    { id: 2, name: "Sepatu Boots", price: 750000, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop" },
    { id: 3, name: "Sepatu Pantofel", price: 600000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop" },
    { id: 4, name: "Sepatu Running", price: 450000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop" },
    { id: 5, name: "Sepatu Casual", price: 400000, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=200&fit=crop" },
    { id: 6, name: "Sepatu Sandal", price: 200000, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=200&fit=crop" }
];

// Inisialisasi keranjang dari localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// Fungsi login
function login(username, password) {
    // Hardcoded credentials for demo
    if (username === "user" && password === "user") {
        localStorage.setItem("user", JSON.stringify({ username }));
        console.log("User logged in successfully"); // Debug
        return true;
    } else {
        console.log("Login failed - wrong credentials"); // Debug
        return false;
    }
}

function logout() {
    localStorage.removeItem("user");
    updateNav();
    window.location.href = "index.html";
}

function updateNav() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navContainer = document.querySelector(".nav .container");
    const mainContent = document.querySelector('.container:not(.nav .container)'); // Main content area

    if (navContainer) {
        // Update login/logout link
        const loginLink = navContainer.querySelector('a[href="login.html"]');
        if (user) {
            if (loginLink) {
                loginLink.textContent = "Logout";
                loginLink.href = "#";
                loginLink.onclick = (e) => {
                    e.preventDefault();
                    logout();
                };
            }
            // Show all navigation links when logged in
            navContainer.querySelectorAll('a').forEach(link => {
                link.style.display = 'inline-block';
            });
            // Show main content when logged in
            if (mainContent) {
                mainContent.style.display = 'block';
            }
        } else {
            if (loginLink) {
                loginLink.textContent = "Login";
                loginLink.href = "login.html";
                loginLink.onclick = null;
            }
            // Hide navigation links except login when not logged in
            const links = navContainer.querySelectorAll('a');
            links.forEach(link => {
                if (!link.href.includes('login.html')) {
                    link.style.display = 'none';
                } else {
                    link.style.display = 'inline-block';
                }
            });
            // Hide main content when not logged in (except on login page)
            if (mainContent && !window.location.pathname.includes('login.html')) {
                mainContent.style.display = 'none';
            }
        }
    }
}

function handleLoginForm() {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username === "user" && password === "user") {
                // Login berhasil
                localStorage.setItem("user", JSON.stringify({ username }));
                message.textContent = "Login berhasil! Mengalihkan...";
                message.className = "message success";

                // Force redirect dengan window.open
                window.open("index.html", "_self");
            } else {
                message.textContent = "Username atau password salah.";
                message.className = "message error";
            }
        });
    }
}

function renderProducts() {
    const list = document.getElementById("product-list");
    if (!list) return;
    list.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 10px;">
            <h3>${p.name}</h3>
            <p>Rp ${p.price.toLocaleString()}</p>
            <button onclick="addToCart(${p.id})" class="btn">Tambah</button>
        </div>
    `).join('');
}

function addToCart(id) {
    if (!cart[id]) cart[id] = { qty: 1 };
    else cart[id].qty++;
    saveCart();
    renderCart();
    renderCheckout();
}

function renderCart() {
    const area = document.getElementById("cart");
    if (!area) return;
    area.innerHTML = Object.keys(cart).map(id => {
        const p = products.find(x => x.id == id);
        return `
            <div class="card">
                <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 10px;">
                <h3>${p.name}</h3>
                <p>Rp ${p.price.toLocaleString()}</p>
                <p>Qty: <input type="number" value="${cart[id].qty}" min="1" onchange="changeQty(${id}, this.value)"></p>
            </div>
        `;
    }).join('');
}

function changeQty(id, qty) {
    qty = parseInt(qty);
    if (qty <= 0) delete cart[id];
    else cart[id].qty = qty;
    saveCart();
    renderCart();
    renderCheckout();
}

function updateCart() {
    saveCart();
    renderCart();
    renderCheckout();
}

function renderCheckout() {
    const area = document.getElementById("checkout-total");
    if (!area) return;
    const total = Object.keys(cart).reduce((sum, id) => {
        const p = products.find(x => x.id == id);
        return sum + (cart[id].qty * p.price);
    }, 0);
    area.innerHTML = `<h2>Total Pembayaran: Rp ${total.toLocaleString()}</h2>`;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function payNow() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Silakan login terlebih dahulu untuk melakukan pembayaran.");
        window.location.href = 'login.html';
        return;
    }

    if (Object.keys(cart).length === 0) {
        alert("Keranjang kosong. Tambahkan produk terlebih dahulu.");
        return;
    }
    alert("Barang Anda sudah dibayar! Terima kasih telah berbelanja.");
    cart = {};
    saveCart();
    renderCart();
    renderCheckout();
}

// Render halaman hanya jika user sudah login
if (currentUser) {
    renderProducts();
    renderCart();
    renderCheckout();
}

// Fungsi untuk cek login
function checkLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    const currentPath = window.location.pathname.toLowerCase();

    // Jika belum login dan bukan di halaman login, redirect ke login
    if (!user && !currentPath.includes('login.html')) {
        console.log("Not logged in, redirecting to login"); // Debug
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Inisialisasi login
document.addEventListener('DOMContentLoaded', function() {
    updateNav();
    handleLoginForm();
});
