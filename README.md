## Sobre o projeto 

Essa é uma aplicação de adoção de animais, a Find a Friend API.
Esse é um projeto que foi desenvolvido a partir de princípios de SOLID, e contemplando testes Unitários e E2E com o Jest. 

## Ferramentas utilizadas

- NodeJs
- TypeScript
- Zod
- Fastify
- Prisma
- Docker
- EsLint
- Jest 
- BCryptJS
- Supertest

## Regras da aplicação

- [] Deve ser possível cadastrar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção
- [] Deve ser possível se cadastrar como uma ORG
- [] Deve ser possível realizar login como uma ORG

## Regras de negócio

- [] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [] Uma ORG precisa ter um endereço e um número de WhatsApp
- [] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

