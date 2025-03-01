const navbar = document.querySelector(".navbar");
const menubtn = document.querySelector(".menu-btn");

menubtn.addEventListener('click', () => {
    navbar.classList.toggle("show-menu");
});


const cartOverlay = document.querySelector(".cart-overlay");
const cartContent = document.querySelector(".cart-content");
const cartTotal = document.querySelector(".cart-total");
const closeCart = document.querySelector(".close-cart");
const openCartButton = document.querySelector(".open-cart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", event => {
        const product = event.target.closest(".produto");
        const name = product.querySelector(".nome-produto").textContent;
        const price = parseFloat(product.querySelector(".preco").textContent.replace("R$", "").replace(",", "."));
        const image = product.querySelector("img").src;
        
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        updateCart();
        localStorage.setItem("cart", JSON.stringify(cart)); // Armazena o carrinho no localStorage
    });
});

// Função para atualizar o carrinho
function updateCart() {
    cartContent.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContent.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" />
                <div>
                    <p>${item.name}</p>
                    <p>R$${item.price.toFixed(2).replace(".", ",")}</p>
                    <div>
                        <button class="decrease" data-name="${item.name}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-name="${item.name}">+</button>
                    </div>
                </div>
                <button class="remove" data-name="${item.name}">&times;</button>
            </div>
        `;
    });
    cartTotal.textContent = `R$${total.toFixed(2).replace(".", ",")}`;
    localStorage.setItem("cart", JSON.stringify(cart)); // Atualiza o carrinho no localStorage

    // Funções para aumentar e diminuir quantidade de itens
    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", event => {
            const name = event.target.dataset.name;
            cart.find(item => item.name === name).quantity++;
            updateCart();
        });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", event => {
            const name = event.target.dataset.name;
            const product = cart.find(item => item.name === name);
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                cart = cart.filter(item => item.name !== name);
            }
            updateCart();
        });
    });

    // Função para remover um item
    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", event => {
            cart = cart.filter(item => item.name !== event.target.dataset.name);
            updateCart();
            if (cart.length === 0) {
                cartOverlay.classList.remove("open");
            }
        });
    });
}

// Função para abrir o carrinho
openCartButton.addEventListener("click", () => {
    cartOverlay.classList.add("open");
});

// Função para fechar o carrinho
closeCart.addEventListener("click", () => {
    cartOverlay.classList.remove("open");
});

// Carregar os itens do carrinho ao abrir a aba
updateCart();





const checkoutButton = document.querySelector(".checkout-btn");
const paymentModalOverlay = document.querySelector(".payment-modal-overlay");
const closeModalButton = document.querySelector(".close-modal");
const paymentForm = document.querySelector("#payment-form");
const totalPriceElement = document.getElementById("total-price");
const cart2 = JSON.parse(localStorage.getItem("cart")) || [];

// Função para calcular o total do carrinho
function calculateTotal() {
    let total = 0;
    cart2.forEach(item => {
        total += item.price * item.quantity;
    });
    totalPriceElement.textContent = total.toFixed(2).replace(".", ",");
}

// Exibir o total ao carregar a página
calculateTotal();

checkoutButton.addEventListener("click", () => {
    paymentModalOverlay.style.display = "flex";  // Abre o modal
});

closeModalButton.addEventListener("click", () => {
    paymentModalOverlay.style.display = "none";  // Fecha o modal
});

paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();  // Evita o envio do formulário padrão

    // Aqui você pode implementar a lógica para processar o pagamento
    alert("Pagamento realizado com sucesso!");

    // Fecha o modal após o pagamento
    paymentModalOverlay.style.display = "none";

    // Limpa o formulário
    paymentForm.reset();
});


