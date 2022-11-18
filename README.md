<h1 align="center">Trybe NG Cash - Desafio</h1>

## Descrição

Sistema de Transferência de fundos entre contas

## Pré requisitos

- Docker
- NodeJS

## Setup do Projeto

### Instalar libs

Antes de prosseguir com as configurações do ambiente, devemos instalar as libs que o projeto vai precisar para rodar. Neste caso, você pode usar o `npm` ou `yarn`. Na pasta raíz rode os comandos: `yarn install` ou `npm install`.

### Configurando ambiente

Como uma forma de facilitar o desenvolvimento e a visualização, deixamos configurado um `docker-compose` que disponibilizará um banco `postgres` localmente, também irá disponibilizar uma IDE chamada `adminer` para acessar o banco de dados na sua porta [8080](http://localhost:8080).

Para subir estes serviços, basta acessar a pasta raíz do projeto e rodar o comandor `docker-compose up` (dependendo do seu ambiente, terá que adicionar um `sudo` na frente do comando).

Você poderá verificar se o serviço está up rodando o comando `docker ps`.

### Criando as tabelas

Com o banco up, você deverá rodar as `migrations` para que as devidas tabelas/colunas sejam criadas no banco. Para isto, vá na raíz do projeto e rode o comando: `yarn typeorm migration:run -d ./src/configs/database.ts`.

## Variáveis de ambiente

Será necessário criar, na raíz do seu projeto, um arquivo chamado `.env` para adicionar as variáveis de ambiente a serem utilizadas no projeto. A princípio, só é necessário definir a variável `PORT` que é a porta em que a aplicação vai rodar.

## Inicializando a aplicação

Para inicializar a aplicação, basta rodar o comando `npm run start` ou `yarn start` para rodar a app no modo de desenvolvimento.

## Rotas

### Criação de usuário

```bash
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "alex",
	"password": "123456"
}'
```

### Login

```bash
curl --request POST \
  --url http://localhost:3000/signin \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "alex",
	"password": "123456"
}'
```

### Validação do Token

```bash
curl --request POST \
  --url http://localhost:3001/users/token/validate \
  --header 'Content-Type: application/json' \
  --data '{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyMi0xMS0xOFQwMjowMDoyOS4xODFaIiwidXNlcklkIjoiMzAwZjg4NjctMmRjOC00OTAwLWExY2ItYjNlNDliMDAwNmI1IiwiaWF0IjoxNjY4NzM2ODI5fQ.2GzEIrj7WM62uDoJbC1VKK-ZKL2ZYgW7z2d406RQsco"
}'
```

### Realizar uma transação

```bash
curl --request POST \
  --url http://localhost:3001/transactions/cashout \
  --header 'Content-Type: application/json' \
  --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyMi0xMS0xOFQwMjowMDoyOS4xODFaIiwidXNlcklkIjoiMzAwZjg4NjctMmRjOC00OTAwLWExY2ItYjNlNDliMDAwNmI1IiwiaWF0IjoxNjY4NzM2ODI5fQ.2GzEIrj7WM62uDoJbC1VKK-ZKL2ZYgW7z2d406RQsco' \
  --data '{
	"username": "paje",
	"amount": 25
}'
```

### Consultar saldo

```bash
curl --request GET \
  --url http://localhost:3001/users/accounts/balance \
  --header 'Content-Type: application/json' \
  --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyMi0xMS0xOFQwMjowMDoyOS4xODFaIiwidXNlcklkIjoiMzAwZjg4NjctMmRjOC00OTAwLWExY2ItYjNlNDliMDAwNmI1IiwiaWF0IjoxNjY4NzM2ODI5fQ.2GzEIrj7WM62uDoJbC1VKK-ZKL2ZYgW7z2d406RQsco'
```

### Consultar minhas transações

Neste caso, tanto as queries `date` quanto `type` são opcionais e servem para, se enviadas, fazer filtros mais específicos.

```bash
curl --request GET \
  --url 'http://localhost:3001/users/transactions?date=2022-11-17&type=S' \
  --header 'Content-Type: application/json' \
  --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyMi0xMS0xOFQwMjowMDoyOS4xODFaIiwidXNlcklkIjoiMzAwZjg4NjctMmRjOC00OTAwLWExY2ItYjNlNDliMDAwNmI1IiwiaWF0IjoxNjY4NzM2ODI5fQ.2GzEIrj7WM62uDoJbC1VKK-ZKL2ZYgW7z2d406RQsco'
```
