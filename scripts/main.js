import { initializeSlider } from "./components/slider.js";
import { initializeProductModal } from "./components/modalProduto.js";

import { Produto } from "./models/Produto.js";
import { Carrinho } from "./models/Carrinho.js";

import { ProdutoRepository } from "./repositories/ProdutoRepository.js";

import { pratos } from "./dadosPratos.js";


// ==========================================
// REPOSITÓRIOS
// ==========================================

const produtoRepository =
    new ProdutoRepository();


// ==========================================
// PRODUTOS
// ==========================================

pratos.forEach(dados => {

    const produto =
        new Produto(
            dados.id,
            dados.nome,
            dados.descricao,
            dados.preco,
            dados.imagem,
            dados.categoria
        );

    produtoRepository.adicionar(
        produto
    );
});


// ==========================================
// CARRINHO
// ==========================================

const carrinho =
    new Carrinho();


// ==========================================
// CONTADOR DO CARRINHO
// ==========================================

function atualizarContadorCarrinho() {

    const cartButton =
        document.querySelector(
            ".btn-cart"
        );

    const totalItens =
        carrinho.itens.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );

    cartButton.style.setProperty(
        "--cart-count",
        `"${totalItens}"`
    );
}


// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================

function adicionarAoCarrinho(
    produtoId,
    quantidade
) {

    const produto =
        produtoRepository.buscarPorId(
            produtoId
        );

    if (!produto) {
        console.error(
            "Produto não encontrado."
        );

        return;
    }

    for (
        let i = 0;
        i < quantidade;
        i++
    ) {
        carrinho.adicionarProduto(
            produto
        );
    }

    atualizarContadorCarrinho();

    console.log(
        "Carrinho:",
        carrinho.itens
    );
}


// ==========================================
// MODAL
// ==========================================


const modal =
    initializeProductModal(
        adicionarAoCarrinho
    );


initializeSlider(
    (produtoId) => {

        const produto =
            produtoRepository.buscarPorId(
                produtoId
            );


        modal.open(
            produto
        );
    }
);

