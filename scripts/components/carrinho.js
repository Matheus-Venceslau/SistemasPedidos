const STORAGE_KEY = "saborEMesa.carrinho";
const CONSUMPTION_KEY = "saborEMesa.tipoEntrega";

export function initializeCart(carrinho, produtoRepository, finalizarPedido) {

    const cart = document.querySelector(".cart");
    const cartButton = document.querySelector(".btn-cart");
    const closeButton = document.querySelector(".cart-close");
    const overlay = document.querySelector(".cart-overlay");
    const productsList = document.querySelector(".products-list");
    const consumptionOptions = [
        ...document.querySelectorAll(".consumptionOption")
    ];
    const subtotalValue = document.querySelector(".subtotal-value");
    const deliveryValue = document.querySelector(".delivery-value");
    const totalValue = document.querySelector(".total-value");
    const clearButton = document.querySelector(".btn-clear-cart");
    const checkoutButton = document.querySelector(".btn-complete-purchase");

    if (!cart || !cartButton || !productsList) {
        console.error("Elementos do carrinho não encontrados.");
        return;
    }

    let tipoEntrega = localStorage.getItem(CONSUMPTION_KEY) || "restaurant";

    function formatPrice(value) {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function abrirCarrinho() {
        cart.classList.add("active");
        overlay?.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function fecharCarrinho() {
        cart.classList.remove("active");
        overlay?.classList.remove("active");
        document.body.style.overflow = "";
    }

    function salvarCarrinho() {
        const dados = carrinho.itens.map(item => ({
            produtoId: item.produto.id,
            quantidade: item.quantidade
        }));

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(dados)
        );

        localStorage.setItem(
            CONSUMPTION_KEY,
            tipoEntrega
        );
    }

    function carregarCarrinho() {
        const dadosSalvos = localStorage.getItem(STORAGE_KEY);

        if (!dadosSalvos) {
            return;
        }

        try {
            const itensSalvos = JSON.parse(dadosSalvos);

            if (!Array.isArray(itensSalvos)) {
                return;
            }

            carrinho.restaurarItens(
                itensSalvos,
                produtoRepository
            );

        } catch (error) {
            console.error(
                "Não foi possível restaurar o carrinho:",
                error
            );

            localStorage.removeItem(STORAGE_KEY);
        }
    }

    function atualizarContador() {
        const totalItens = carrinho.itens.reduce(
            (total, item) => total + item.quantidade,
            0
        );

        cartButton.style.setProperty(
            "--cart-count",
            `"${totalItens}"`
        );

        cartButton.classList.toggle(
            "has-items",
            totalItens > 0
        );
    }

    function atualizarFormaConsumo() {
        consumptionOptions.forEach(option => {
            const radio = option.querySelector("input[type='radio']");
            const selecionado = option.dataset.method === tipoEntrega;

            option.classList.toggle("active", selecionado);

            if (radio) {
                radio.checked = selecionado;
            }
        });
    }

    function atualizarValores() {
        const subtotal = carrinho.calcularSubtotal();
        const taxa = carrinho.calcularTaxaEntrega(tipoEntrega);
        const total = carrinho.calcularTotal(tipoEntrega);

        subtotalValue.textContent = formatPrice(subtotal);
        deliveryValue.textContent = formatPrice(taxa);
        totalValue.textContent = formatPrice(total);
    }

    function mostrarMensagem(mensagem) {
        let feedback = document.querySelector(".cart-feedback");

        if (!feedback) {
            feedback = document.createElement("div");
            feedback.classList.add("cart-feedback");
            document.body.appendChild(feedback);
        }

        feedback.textContent = mensagem;
        feedback.classList.add("active");

        clearTimeout(feedback.timeout);

        feedback.timeout = setTimeout(() => {
            feedback.classList.remove("active");
        }, 2200);
    }

    function renderizarProdutos() {
        productsList.innerHTML = "";

        const itens = carrinho.itens;

        if (itens.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.classList.add("cart-empty");
            emptyMessage.innerHTML = `
                <i class="fa-solid fa-cart-shopping"></i>
                <h4>Seu carrinho está vazio</h4>
                <p>Adicione um prato para começar seu pedido.</p>
            `;

            productsList.appendChild(emptyMessage);
            return;
        }

        itens.forEach(item => {
            const produto = item.produto;

            const li = document.createElement("li");
            li.dataset.productId = produto.id;

            li.innerHTML = `
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <div class="product-info">
                    <h5>${produto.nome}</h5>
                    <p>${produto.descricao}</p>
                    <span class="product-price">
                        ${formatPrice(produto.preco)}
                    </span>
                </div>

                <div class="cart-quantity-control">
                    <button
                        class="cart-quantity-minus"
                        type="button"
                        data-action="decrease"
                        data-product-id="${produto.id}"
                        aria-label="Diminuir quantidade de ${produto.nome}"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </button>

                    <span class="cart-quantity-value">
                        ${item.quantidade}
                    </span>

                    <button
                        class="cart-quantity-plus"
                        type="button"
                        data-action="increase"
                        data-product-id="${produto.id}"
                        aria-label="Aumentar quantidade de ${produto.nome}"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>

                <button
                    class="delete-item"
                    type="button"
                    data-action="remove"
                    data-product-id="${produto.id}"
                    aria-label="Remover ${produto.nome} do carrinho"
                >
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `;

            productsList.appendChild(li);
        });
    }

    function atualizarInterface() {
        atualizarFormaConsumo();
        renderizarProdutos();
        atualizarValores();
        atualizarContador();
        salvarCarrinho();
    }

    function alterarQuantidade(produtoId, acao) {
        if (acao === "increase") {
            carrinho.aumentarQuantidade(produtoId);
            mostrarMensagem("Quantidade atualizada.");
        }

        if (acao === "decrease") {
            const item = carrinho.itens.find(
                item => item.produto.id === produtoId
            );

            if (!item) {
                return;
            }

            if (item.quantidade === 1) {
                mostrarMensagem("A quantidade mínima é 1.");
                return;
            }

            carrinho.diminuirQuantidade(produtoId);
            mostrarMensagem("Quantidade atualizada.");
        }

        atualizarInterface();
    }

    function removerProduto(produtoId) {
        const item = carrinho.itens.find(
            item => item.produto.id === produtoId
        );

        if (!item) {
            return;
        }

        const confirmar = window.confirm(
            `Remover "${item.produto.nome}" do carrinho?`
        );

        if (!confirmar) {
            return;
        }

        carrinho.removerProduto(produtoId);
        atualizarInterface();
        mostrarMensagem("Produto removido do carrinho.");
    }

    function limparCarrinho() {
        if (carrinho.itens.length === 0) {
            return;
        }

        const confirmar = window.confirm(
            "Deseja realmente limpar todo o carrinho?"
        );

        if (!confirmar) {
            return;
        }

        carrinho.limpar();
        atualizarInterface();
        mostrarMensagem("Carrinho limpo.");
    }

    cartButton.addEventListener("click", event => {
        event.preventDefault();
        abrirCarrinho();
    });

    closeButton?.addEventListener("click", fecharCarrinho);
    overlay?.addEventListener("click", fecharCarrinho);

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            cart.classList.contains("active")
        ) {
            fecharCarrinho();
        }
    });

    productsList.addEventListener("click", event => {
        const button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        const produtoId = Number(button.dataset.productId);
        const action = button.dataset.action;

        if (action === "remove") {
            removerProduto(produtoId);
            return;
        }

        alterarQuantidade(produtoId, action);
    });

    consumptionOptions.forEach(option => {
        option.addEventListener("click", () => {
            tipoEntrega = option.dataset.method;

            localStorage.setItem(
                CONSUMPTION_KEY,
                tipoEntrega
            );

            atualizarInterface();

            if (tipoEntrega === "delivery") {
                mostrarMensagem(
                    "Delivery selecionado. Taxa de R$ 2,50 aplicada."
                );
            } else {
                mostrarMensagem(
                    "Consumo no restaurante selecionado."
                );
            }
        });
    });

    clearButton?.addEventListener("click", limparCarrinho);

    checkoutButton?.addEventListener("click", () => {
        if (carrinho.itens.length === 0) {
            mostrarMensagem("Adicione pelo menos um produto ao carrinho.");
            return;
        }

        if (typeof finalizarPedido === "function") {
            finalizarPedido(tipoEntrega);
        }
    });

    carregarCarrinho();
    atualizarInterface();

    return {
        abrir: abrirCarrinho,
        fechar: fecharCarrinho,
        atualizar: atualizarInterface
    };
}
