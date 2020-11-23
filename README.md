# Backend Tic - Projeto marktplace para cabeleleiros
### Este projeto foi desenvolvido para o trabalho invidual de conclusão (TIC).

### Passos para conseguir rodar o projeto:

#### 1) Crie um banco de dados por uma interface como postbird ou pgAdmin.

#### 2) Clone este projeto com o comando:

````js
  git clone https://github.com/Yuri-Tiofilo/backend-tic.git
````

#### 3) Rode o comando dentro do peojeto para instalar todas as dependencias:

````js
  yarn install
````
ou
````js
  npm install
````

#### 4) Atualize o arquivo ormconfig.json com as credenciais do banco que foi criado no passo 1.

#### 5) Após isso rode as migrations com o comando:

````js
  yarn typeorm migration:run
````

#### 6) Para iniciar o projeto e assim ter acesso ao servidor rode o comando:

````js
  yarn dev:server
````
O projeto foi desenvolvido com essas tecnologias:

-  [Node.js](https://nodejs.org/)
-  [Typeorm](https://typeorm.io/#/)
-  [Typescript](https://www.typescriptlang.org/)
-  [Express](https://expressjs.com/pt-br/)
-  [Date-fns](https://date-fns.org/)
-  [ESLint](https://eslint.org/)
-  [Prettier](https://prettier.io/)
-  [Docker](https://www.docker.com/docker-community/0)
-  [Postgres](https://www.postgresql.org/)
-  [VS Code](https://code.visualstudio.com/)
