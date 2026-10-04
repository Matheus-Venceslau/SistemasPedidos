import { ItemCarrinho } from "./ItemCarrinho.js";
export class Carrinho {

    #itens;

    constructor() {
        this.#itens = [];
    }

    get itens() {
        return [...this.#itens];
    }

    adicionarProduto(produto) {

        const itemExistente =
            this.#itens.find(
                item =>
                    item.produto.id === produto.id
            );

        if (itemExistente) {

            itemExistente.aumentarQuantidade();

            return;
        }

        const novoItem =
            new ItemCarrinho(produto);

        this.#itens.push(novoItem);
    }

    removerProduto(produtoId) {

        this.#itens =
            this.#itens.filter(
                item =>
                    item.produto.id !== produtoId
            );
    }

    aumentarQuantidade(produtoId) {

        const item =
            this.#encontrarItem(produtoId);

        if (item) {
            item.aumentarQuantidade();
        }
    }

    diminuirQuantidade(produtoId) {

        const item =
            this.#encontrarItem(produtoId);

        if (item) {
            item.diminuirQuantidade();
        }
    }

    calcularSubtotal() {

        return this.#itens.reduce(
            (total, item) =>
                total +
                item.calcularSubtotal(),
            0
        );
    }

    calcularTaxaEntrega(tipoEntrega) {

        if (
            tipoEntrega === "delivery" &&
            this.#itens.length > 0
        ) {
            return 2.50;
        }

        return 0;
    }

    calcularTotal(tipoEntrega) {

        return (
            this.calcularSubtotal() +
            this.calcularTaxaEntrega(
                tipoEntrega
            )
        );
    }

    limpar() {
        this.#itens = [];
    }

    #encontrarItem(produtoId) {

        return this.#itens.find(
            item =>
                item.produto.id === produtoId
        );
    }
}