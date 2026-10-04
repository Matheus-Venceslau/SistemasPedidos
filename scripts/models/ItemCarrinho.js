import { Produto } from "./Produto.js";

export class ItemCarrinho{
    #produto;
    #quantidade;

    constructor(produto, quantidade = 1){
        if(!(produto instanceof Produto)){
            throw new Error("O item deve possuir um produto válido");
        }

        this.#produto = produto;
        this.#quantidade = quantidade;
    }

    get produto() {
        return this.#produto;
    }

    get quantidade() {
        return this.#quantidade;
    }

    aumentarQuantidade() {
        this.#quantidade++;
    }

    diminuirQuantidade() {

        if (this.#quantidade <= 1) {
            return;
        }

        this.#quantidade--;
    }

    alterarQuantidade(quantidade) {

        if (quantidade < 1) {
            throw new Error(
                "A quantidade deve ser maior que zero."
            );
        }

        this.#quantidade = quantidade;
    }

    calcularSubtotal() {
        return (
            this.#produto.preco *
            this.#quantidade
        );
    }
}