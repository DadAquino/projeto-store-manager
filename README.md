# Store Manager API

Este projeto desenvolve uma API RESTful para gerenciar um sistema de vendas, permitindo a criação, leitura, atualização e exclusão de produtos e vendas. A API utiliza a arquitetura em camadas e um banco de dados MySQL para persistir os dados. Testes automatizados são implementados para garantir a funcionalidade da API.

## Descrição do Projeto

O projeto consiste na criação de uma API para gerenciar vendas, com as seguintes funcionalidades:

* **Gerenciamento de Produtos:**
    * Listar todos os produtos.
    * Listar um produto específico por ID.
    * Cadastrar novos produtos.
    * Atualizar produtos existentes.
    * Deletar produtos.
    * Pesquisar produtos por nome.
* **Gerenciamento de Vendas:**
    * Listar todas as vendas.
    * Listar uma venda específica por ID.
    * Cadastrar novas vendas, incluindo a venda de múltiplos produtos em uma única requisição.
    * Deletar vendas.
    * Atualizar a quantidade de um produto em uma venda.
* **Validações:** Implementação de validações para os dados de entrada nas operações de cadastro e atualização, tanto de produtos quanto de vendas.
* **Testes:** Desenvolvimento de testes unitários e de integração para garantir a qualidade e a robustez da API.

## Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript para o backend.
* **Express:** Framework web para Node.js, utilizado para construir a API RESTful.
* **MySQL:** Sistema de gerenciamento de banco de dados relacional (SGBDR) para persistir os dados.
* **Mocha:** Framework de testes JavaScript.
* **Chai:** Biblioteca de asserções para testes JavaScript.
* **Sinon:** Biblioteca para stubs e mocks para testes JavaScript.
* **Cypress:** Framework de testes end-to-end (opcional, para testes na interface gráfica).
* **Docker (Opcional):** Para facilitar a configuração do ambiente de desenvolvimento.

## Como Executar o Projeto

Para executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone <seu_repositorio_aqui>
    cd <nome_do_repositorio>
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configurar o banco de dados:**

    * Certifique-se de ter o MySQL instalado e em execução.
    * Crie um arquivo `.env` na raiz do projeto, seguindo o exemplo do arquivo `.env.example`, e configure as variáveis de ambiente do banco de dados (host, port, user, password, database).

4.  **Iniciar o banco de dados (Opcional):**

    * Você pode usar o Docker Compose para iniciar o banco de dados MySQL:

        ```bash
        docker-compose up -d db
        ```

5.  **Executar as migrações (Se necessário):**

    * As tabelas do banco de dados são criadas automaticamente pelos scripts SQL fornecidos no projeto. Se precisar recriá-las, consulte o README principal.

6.  **Iniciar a aplicação:**

    * Para iniciar a aplicação em modo de desenvolvimento:

        ```bash
        npm run dev:local
        ```

    * Para iniciar a aplicação em modo de produção (após o build):

        ```bash
        npm start
        ```

7.  **Executar os testes:**

    * Para executar os testes unitários com Mocha:

        ```bash
        npm run test:mocha
        ```

    * Para executar os testes do avaliador:

        ```bash
        npm test
        ```

    * Para executar os testes end-to-end com Cypress (se houver):

        ```bash
        npm run cy:open
        ```

**Observações Importantes:**

* Certifique-se de que o MySQL esteja rodando e acessível.
* O arquivo `.env` deve estar corretamente configurado com as credenciais do banco de dados.
* Use `npm run dev:local` para desenvolvimento com hot-reloading.
* Os scripts `npm run` estão definidos no arquivo `package.json`.
* Consulte o README principal do projeto para informações adicionais sobre Docker e outras configurações.
