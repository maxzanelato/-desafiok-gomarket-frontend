# GoMarket

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Tabela de conteúdos:

   * [Descrição do Projeto](#descrição-do-projeto)
   * [Instalação](#instalação)
   * [Como usar](#como-usar)
      * [Pré requisitos](#pré-requisitos)
      * [Execução](#execução)
   * [Tecnologias](#tecnologias)


## Descrição do projeto
GoMarket é um mercado que oferece as opções de cadastro, edição, pesquisa, lista e remoção de produtos. Conta ainda com uma tela de login onde pessoas registradas poderão realizar as operações.

  - CRUD de produtos
  - Pesquisa de produtos
  - Login
  - Registro de usuário

 O back-end estará disponível em [Back-end][df1]

## Instalação

GoMarket requer requer NodeJS para executar e yarn para as dependências.

```sh
$ cd -desafiok-gomarket-frontend
$ yarn 
$ yarn start
```

Porém é necessário se atentar aos pré-requisitos antes de executá-lo.

## Como usar

### Pré requisitos
- O [back-end][df1] estar executando;
- Ter yarn instalado na máquina;
- Ter NodeJS instalado na máquina.

### Execução

GoMarket requer que siga os passos abaixo para sua execução:

- Seguir os comandos abaixo:
```sh
$ cd -desafiok-gomarket-frontend
$ yarn
$ yarn start
```
- Ao final, o sistema irá inicializar na porta 3000.

## Tecnologias
As seguintes tecnologias foram utilizadas:

| Lib | Descrição |
| ------ | ------ |
| react | Biblioteca do ReactJS |
| react-dom | Biblioteca de acesso ao DOM do ReactJS | 
| unform/core | Manipulador de formulários |
| unform/web | Manupulador de formulários para ReactJS |
| axios | Cliente HTTP | 
| polished | Efeitos de CSS |
| react-icons | Ícones do React |
| react-scripts | Configuração de scripts do React |
| styled-components | Lib para escrever CSS dentro do Javascript |
| typescript | Superset da linguagem JavaScript |
| uuidv4 | Gerador de id |
| yup | Validador de formulários |
| prettier | Formatador de código |
| eslint-plugin-import | Plugin de eslint para import |
| eslint-plugin-prettier | Plugin eslint para prettier |
| eslint-import-resolver-typescript | Resolver de arquivos typescript |
| eslint-config-airbnb-base | Base de configurações de padrão de código do airbnb  |
| eslint | Formatador de código  |



   [df1]: <https://github.com/maxzanelato/desafiok-gomarket-backend>
