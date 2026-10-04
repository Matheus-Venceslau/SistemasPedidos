# 🍽️ SistemasPedidos

Sistema web para gerenciamento de pedidos de um restaurante, desenvolvido com foco em uma experiência de navegação simples, moderna e intuitiva.

O projeto simula o fluxo de um cliente desde a visualização do cardápio até a seleção de produtos para o carrinho, utilizando **HTML, CSS e JavaScript** para construção da interface e implementação das funcionalidades.

## 📌 Sobre o projeto

O **SistemasPedidos** foi desenvolvido como um projeto prático para aplicar conceitos de desenvolvimento web, organização de código e manipulação do DOM com JavaScript.

A aplicação possui uma página inicial para apresentação do restaurante e uma área de cardápio organizada por categorias, permitindo visualizar os produtos e adicioná-los ao carrinho.

## ✨ Funcionalidades

* 🏠 Página inicial do restaurante
* 🍔 Cardápio organizado por categorias
* 🛒 Adição de produtos ao carrinho
* 🔢 Contador de itens no carrinho
* 📋 Visualização dos produtos selecionados
* ➕ Controle da quantidade de produtos
* ➖ Remoção de produtos do carrinho
* 💰 Atualização do valor dos itens
* 💵 Cálculo do valor total do pedido
* 📱 Interface responsiva
* 🌙 Suporte a tema claro e escuro
* 🎨 Interface moderna focada na experiência do usuário

## 🛠️ Tecnologias utilizadas

### Front-end

* HTML5
* CSS3
* JavaScript
* Font Awesome

### Conceitos aplicados

* Manipulação do DOM
* Eventos JavaScript
* Arrays e objetos
* Funções
* Modularização de JavaScript
* Organização de componentes visuais
* Responsividade
* Controle de estado do carrinho
* Manipulação dinâmica de elementos HTML

## 📂 Estrutura do projeto

```text
SistemasPedidos/
│
├── img/
│   └── Imagens utilizadas no projeto
│
├── pages/
│   └── Páginas HTML do sistema
│
├── scripts/
│   └── Arquivos JavaScript e lógica da aplicação
│
├── styles/
│   └── Arquivos CSS e estilos da aplicação
│
└── README.md
```

## 🛒 Funcionamento do carrinho

O carrinho é controlado através de JavaScript.

Ao selecionar um produto, suas informações são utilizadas para criar ou atualizar um item no carrinho. A aplicação também permite alterar a quantidade dos produtos e remover itens.

O valor total é recalculado conforme as alterações realizadas pelo usuário.

Esse funcionamento utiliza principalmente:

```javascript
Array
Object
DOM
Event Listeners
Functions
```

## 🎨 Interface

A interface foi desenvolvida buscando equilibrar estética e usabilidade, utilizando:

* Cards para apresentação dos produtos
* Categorias para organização do cardápio
* Ícones para facilitar a identificação das ações
* Feedback visual para interações
* Layout responsivo para diferentes tamanhos de tela
* Temas claro e escuro

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/Matheus-Venceslau/SistemasPedidos.git
```

### 2. Acesse a pasta

```bash
cd SistemasPedidos
```

### 3. Execute o projeto

Por ser uma aplicação front-end, basta abrir o arquivo HTML principal no navegador.

Para uma experiência de desenvolvimento mais adequada, recomenda-se utilizar o **Live Server** no Visual Studio Code.

## 📚 Objetivos de aprendizado

Este projeto foi desenvolvido com o objetivo de praticar conceitos fundamentais de desenvolvimento web, principalmente:

* Estruturação semântica com HTML
* Estilização avançada com CSS
* JavaScript aplicado a uma aplicação real
* Manipulação do DOM
* Organização de arquivos
* Criação de interfaces interativas
* Gerenciamento de estado no front-end
* Desenvolvimento de funcionalidades de carrinho

## 🔮 Próximos passos

Algumas funcionalidades que podem ser implementadas futuramente:

* [ ] Sistema de autenticação
* [ ] Cadastro de clientes
* [ ] Integração com banco de dados
* [ ] API para gerenciamento dos pedidos
* [ ] Área administrativa
* [ ] Histórico de pedidos
* [ ] Integração com formas de pagamento
* [ ] Backend utilizando Java e Spring Boot
