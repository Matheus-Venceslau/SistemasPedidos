export function initializeProductModal(
    adicionarAoCarrinho
) {

    const modal =
        document.querySelector(
            ".product-modal"
        );

    const closeButton =
        document.querySelector(
            ".product-modal-close"
        );

    const image =
        document.querySelector(
            ".modal-product-image"
        );

    const name =
        document.querySelector(
            ".modal-product-name"
        );

    const description =
        document.querySelector(
            ".modal-product-description"
        );

    const unitPrice =
        document.querySelector(
            ".modal-unit-price"
        );

    const totalPrice =
        document.querySelector(
            ".modal-total-price"
        );

    const quantityValue =
        document.querySelector(
            ".quantity-value"
        );

    const minusButton =
        document.querySelector(
            ".quantity-minus"
        );

    const plusButton =
        document.querySelector(
            ".quantity-plus"
        );

    const addButton =
        document.querySelector(
            ".modal-add-cart"
        );


    let selectedProduct = null;

    let quantity = 1;


    // ==========================================
    // FORMATAR PREÇO
    // ==========================================

    function formatPrice(value) {

        return value.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }


    // ==========================================
    // ATUALIZAR TOTAL
    // ==========================================

    function updateTotal() {

        if (!selectedProduct) {
            return;
        }


        const total =
            selectedProduct.preco *
            quantity;


        quantityValue.textContent =
            quantity;


        totalPrice.textContent =
            formatPrice(
                total
            );
    }


    // ==========================================
    // ABRIR MODAL
    // ==========================================

    function open(produto) {

        if (!produto) {

            console.error(
                "Produto não encontrado."
            );

            return;
        }


        selectedProduct =
            produto;


        quantity = 1;


        // ==========================================
        // IMAGEM
        // ==========================================

        image.src =
            selectedProduct.imagem;

        image.alt =
            selectedProduct.nome;


        // ==========================================
        // NOME
        // ==========================================

        name.textContent =
            selectedProduct.nome;


        // ==========================================
        // DESCRIÇÃO
        // ==========================================

        description.textContent =
            selectedProduct.descricao;


        // ==========================================
        // PREÇO UNITÁRIO
        // ==========================================

        unitPrice.textContent =
            formatPrice(
                selectedProduct.preco
            );


        // ==========================================
        // TOTAL
        // ==========================================

        updateTotal();


        // ==========================================
        // MOSTRAR MODAL
        // ==========================================

        modal.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";
    }


    // ==========================================
    // FECHAR MODAL
    // ==========================================

    function close() {

        modal.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";
    }


    // ==========================================
    // AUMENTAR QUANTIDADE
    // ==========================================

    plusButton.addEventListener(
        "click",
        () => {

            quantity++;

            updateTotal();
        }
    );


    // ==========================================
    // DIMINUIR QUANTIDADE
    // ==========================================

    minusButton.addEventListener(
        "click",
        () => {

            if (quantity <= 1) {
                return;
            }


            quantity--;

            updateTotal();
        }
    );


    // ==========================================
    // ADICIONAR AO CARRINHO
    // ==========================================

    addButton.addEventListener(
        "click",
        () => {

            if (!selectedProduct) {
                return;
            }


            adicionarAoCarrinho(
                selectedProduct.id,
                quantity
            );


            close();
        }
    );


    // ==========================================
    // BOTÃO FECHAR
    // ==========================================

    closeButton.addEventListener(
        "click",
        close
    );


    // ==========================================
    // FECHAR CLICANDO FORA
    // ==========================================

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                close();
            }
        }
    );


    // ==========================================
    // FECHAR COM ESC
    // ==========================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                close();
            }
        }
    );


    return {
        open
    };
}
