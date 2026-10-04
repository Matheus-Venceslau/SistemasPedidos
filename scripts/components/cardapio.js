export function initializeMenuGallery(
    produtos,
    abrirModal,
    adicionarAoCarrinho
) {

    const gallery =
        document.querySelector(".menu-gallery-content");

    if (!gallery) {
        return;
    }

    const categorias =
        produtos.reduce((grupos, produto) => {

            if (!grupos[produto.categoria]) {
                grupos[produto.categoria] = [];
            }

            grupos[produto.categoria].push(produto);

            return grupos;
        }, {});


    function formatPrice(value) {

        return value.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }


    function criarCard(produto) {

        const card =
            document.createElement("article");

        card.classList.add("menu-product-card");
        card.dataset.productId = produto.id;

        card.innerHTML = `
            <div class="menu-product-image">
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy"
                >
            </div>

            <div class="menu-product-info">

                <div class="menu-product-text">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                </div>

                <div class="menu-product-footer">
                    <span class="menu-product-price">
                        ${formatPrice(produto.preco)}
                    </span>

                    <button
                        class="dish-cart"
                        type="button"
                        data-product-id="${produto.id}"
                    >
                        <i class="fa-solid fa-cart-shopping"></i>
                        Adicionar
                    </button>
                </div>

            </div>
        `;

        card.addEventListener("click", event => {

            if (event.target.closest(".dish-cart")) {
                return;
            }

            abrirModal(produto);
        });

        const addButton =
            card.querySelector(".dish-cart");

        addButton.addEventListener("click", event => {

            event.stopPropagation();

            adicionarAoCarrinho(
                produto.id,
                1
            );
        });

        return card;
    }


    Object.entries(categorias).forEach(
        ([categoria, produtosCategoria]) => {

            const section =
                document.createElement("section");

            section.classList.add("menu-category");

            const categoryId =
                `categoria-${categoria
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9]+/g, "-")}`;

            section.id = categoryId;

            section.innerHTML = `
                <header class="menu-category-header">
                    <span>
                        <i class="fa-solid fa-utensils"></i>
                        ${categoria}
                    </span>
                    <h2>${categoria}</h2>
                    <div class="category-divider"></div>
                </header>

                <div class="menu-product-grid"></div>
            `;

            const grid =
                section.querySelector(".menu-product-grid");

            produtosCategoria.forEach(produto => {
                grid.appendChild(
                    criarCard(produto)
                );
            });

            gallery.appendChild(section);
        }
    );
}
