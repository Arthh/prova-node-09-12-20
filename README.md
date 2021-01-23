### Rodando o projeto
Clone o projeto, após entrar na pasta use o comando  `yarn`.

O projeto utiliza uma base de dados postgreSQL, database chamada helpper.

Se necessario utilize com docker com o comando `docker run --name helpper -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`.

Utilize o comando `yarn sequelize db:migrate`.

Para iniciar o projeto utilize o comando `yarn start`.

Para realizar os testes unitários utilize o comando `yarn mocha`.


## ROTAS
O projeto possui rotas para criação, edição, listagem, detalhe, deletar e fazer login.

