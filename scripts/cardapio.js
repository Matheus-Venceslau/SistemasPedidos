import { initializeProductModal } from "./components/modalProduto.js";
import { initializeCart } from "./components/carrinho.js";
import { initializeMenuGallery } from "./components/cardapio.js";

import { Produto } from "./models/Produto.js";
import { Carrinho } from "./models/Carrinho.js";
import { Pedido } from "./models/Pedido.js";

import { ProdutoRepository } from "./repositories/ProdutoRepository.js";
import { pratos } from "./dadosPratos.js";


const produtoRepository =
    new ProdutoRepository();


pratos.forEach(dados => {

    produtoRepository.adicionar(
        new Produto(
            dados.id,
            dados.nome,
            dados.descricao,
            dados.preco,
            dados.imagem,
            dados.categoria
        )
    );
});


const carrinho =
    new Carrinho();


function atualizarContadorCarrinho() {

    const cartButton =
        document.querySelector(".btn-cart");

    if (!cartButton) {
        return;
    }

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


function mostrarFeedback(mensagem) {

    let feedback =
        document.querySelector(".cart-feedback");

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


function adicionarAoCarrinho(
    produtoId,
    quantidade
) {

    const produto =
        produtoRepository.buscarPorId(
            Number(produtoId)
        );

    if (!produto) {
        console.error("Produto não encontrado.");
        return;
    }

    for (let i = 0; i < quantidade; i++) {
        carrinho.adicionarProduto(produto);
    }

    atualizarContadorCarrinho();
    carrinhoUI.atualizar();

    mostrarFeedback(
        `${produto.nome} adicionado ao carrinho.`
    );
}


function finalizarPedido(tipoEntrega) {

    const cliente =
        window.prompt(
            "Digite seu nome para finalizar o pedido:"
        );

    if (!cliente || !cliente.trim()) {
        mostrarFeedback(
            "Informe seu nome para finalizar o pedido."
        );
        return;
    }

    const pedido =
        new Pedido(
            cliente.trim(),
            carrinho.itens,
            tipoEntrega
        );

    const pedidosSalvos =
        JSON.parse(
            localStorage.getItem(
                "saborEMesa.pedidos"
            ) || "[]"
        );

    pedidosSalvos.push({
        cliente: pedido.cliente,
        itens: pedido.itens.map(item => ({
            produtoId: item.produto.id,
            nome: item.produto.nome,
            preco: item.produto.preco,
            quantidade: item.quantidade,
            subtotal: item.calcularSubtotal()
        })),
        tipoEntrega: pedido.tipoEntrega,
        status: pedido.status,
        data: pedido.data.toISOString(),
        subtotal: pedido.calcularSubtotal(),
        taxaEntrega: pedido.calcularTaxaEntrega(),
        total: pedido.calcularTotal()
    });

    localStorage.setItem(
        "saborEMesa.pedidos",
        JSON.stringify(pedidosSalvos)
    );

    mostrarFeedback(
        `Pedido finalizado com sucesso! Total: ${
            pedido.calcularTotal().toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            )
        }`
    );

    carrinho.limpar();
    carrinhoUI.atualizar();
}


const carrinhoUI =
    initializeCart(
        carrinho,
        produtoRepository,
        finalizarPedido
    );


const modal =
    initializeProductModal(
        adicionarAoCarrinho
    );


initializeMenuGallery(
    produtoRepository.listarTodos(),
    produto => modal.open(produto),
    adicionarAoCarrinho
);
