## Sobre o projeto 

Essa é uma aplicação de adoção de animais, a Find a Friend App.
Esse é um projeto que foi desenvolvido a partir de princípios de SOLID, e contemplando testes Unitários e E2E com o Vitest. 

## Ferramentas utilizadas

- NodeJs
- TypeScript
- Zod
- Fastify
- Prisma
- Docker
- EsLint
- Vitest 
- BCryptJS
- Supertest

## Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por sua raça
- [x] Deve ser possível filtrar pets por seu status
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

