export class Pedido {

    #cliente;
    #itens;
    #tipoEntrega;
    #status;
    #data;

    constructor(
        cliente,
        itens,
        tipoEntrega
    ) {

        this.#cliente = cliente;

        this.#itens = [...itens];

        this.#tipoEntrega =
            tipoEntrega;

        this.#status = "PENDENTE";

        this.#data = new Date();
    }

    get cliente() {
        return this.#cliente;
    }

    get itens() {
        return [...this.#itens];
    }

    get tipoEntrega() {
        return this.#tipoEntrega;
    }

    get status() {
        return this.#status;
    }

    get data() {
        return this.#data;
    }

    alterarStatus(novoStatus) {

        this.#status = novoStatus;
    }

    calcularSubtotal() {

        return this.#itens.reduce(
            (total, item) =>
                total +
                item.calcularSubtotal(),
            0
        );
    }

    calcularTaxaEntrega() {

        if (
            this.#tipoEntrega === "delivery"
        ) {
            return 2.50;
        }

        return 0;
    }

    calcularTotal() {

        return (
            this.calcularSubtotal() +
            this.calcularTaxaEntrega()
        );
    }
}