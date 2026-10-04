export class Produto {

    #id;
    #nome;
    #descricao;
    #preco;
    #imagem;
    #categoria;

    constructor(
        id,
        nome,
        descricao,
        preco,
        imagem,
        categoria = null
    ) {
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#preco = preco;
        this.#imagem = imagem;
        this.#categoria = categoria;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get descricao() {
        return this.#descricao;
    }

    get preco() {
        return this.#preco;
    }

    get imagem() {
        return this.#imagem;
    }

    get categoria() {
        return this.#categoria;
    }

    alterarNome(nome) {
        if (!nome.trim()) {
            throw new Error(
                "O nome do produto não pode estar vazio."
            );
        }

        this.#nome = nome;
    }

    alterarDescricao(descricao) {
        this.#descricao = descricao;
    }

    alterarPreco(preco) {
        if (preco <= 0) {
            throw new Error(
                "O preço deve ser maior que zero."
            );
        }

        this.#preco = preco;
    }

    alterarImagem(imagem) {
        this.#imagem = imagem;
    }

    alterarCategoria(categoria) {
        this.#categoria = categoria;
    }
}
