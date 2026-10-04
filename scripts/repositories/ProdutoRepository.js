export class ProdutoRepository {

    #produtos;

    constructor() {
        this.#produtos = [];
    }

    // CREATE

    adicionar(produto) {

        const produtoExistente =
            this.buscarPorId(produto.id);

        if (produtoExistente) {
            throw new Error(
                "Já existe um produto com esse ID."
            );
        }

        this.#produtos.push(produto);
    }


    // READ

    listarTodos() {

        return [...this.#produtos];
    }

    buscarPorId(id) {

        return this.#produtos.find(
            produto =>
                produto.id === id
        );
    }


    // UPDATE

    atualizar(id, dados) {

        const produto =
            this.buscarPorId(id);

        if (!produto) {
            throw new Error(
                "Produto não encontrado."
            );
        }

        if (dados.nome !== undefined) {
            produto.alterarNome(
                dados.nome
            );
        }

        if (dados.descricao !== undefined) {
            produto.alterarDescricao(
                dados.descricao
            );
        }

        if (dados.preco !== undefined) {
            produto.alterarPreco(
                dados.preco
            );
        }

        if (dados.imagem !== undefined) {
            produto.alterarImagem(
                dados.imagem
            );
        }

        if (dados.categoria !== undefined) {
            produto.alterarCategoria(
                dados.categoria
            );
        }

        return produto;
    }


    // DELETE

    remover(id) {

        const indice =
            this.#produtos.findIndex(
                produto =>
                    produto.id === id
            );

        if (indice === -1) {
            return false;
        }

        this.#produtos.splice(
            indice,
            1
        );

        return true;
    }
}
