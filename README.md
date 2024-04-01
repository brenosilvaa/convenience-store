# Loja de Conveniência

## Descrição
O sistema **Loja de Conveniência** oferece uma plataforma intuitiva e eficiente para que os funcionários de sua empresa possam realizar vendas de produtos entre si de forma conveniente e organizada. Com esta ferramenta inovadora, os colaboradores têm a oportunidade de comprar e vender uma variedade de itens, desde lanches e bebidas até produtos de uso pessoal, promovendo uma cultura de interação e colaboração dentro do ambiente de trabalho.

Este sistema proporciona uma experiência de compra simplificada, permitindo que os funcionários naveguem por um catálogo de produtos disponíveis, visualizem informações detalhadas sobre cada item e gerenciem suas vendas de maneira autônoma. Além disso, os usuários têm a liberdade de cadastrar novos produtos, atualizar inventários e acessar facilmente os dados de contato dos vendedores para efetuar o pagamento via Pix.


## Vamos Começar

Iremos abordar como rodar tanto o *back-end* quanto o *front-end* da aplicação.

### Back-End
O que será abordado:
- Restauração de pacotes;
- Subindo banco de dados;
- Porta de execução;
- Variáveis de ambiente;
- User Secrets;

#### Restauração de pacotes

Deve-se abrir uma janela do terminal na pasta em que o projeto está e executar o seguinte comando:

```terminal
dotnet restore
```

#### Subindo banco de dados

Deve-se abrir uma janela do terminal na pasta em que o projeto está e executar o seguinte comando:

```terminal
docker-compose up
```

#### Porta de execução

A porta de execução é:
- :5262

#### Variáveis de ambiente

As variáveis são:

| Chave       | Valor             |
| ----------- | ----------------- |
| DB_HOST     | localhost         |
| DB_PORT     | 3306              |
| DB_DATABASE | convenience-store |

#### User Secrets

Para definir as *user secrets* você deve clicar com o botão direito do mouse sobre o projeto e depois em **Manage User Secrets**:

| Chave       | Valor                     |
| ----------- | ------------------------- |
| DB_USER     | Usuário no **seu DOCKER** |
| DB_PWD      | Senha no **seu DOCKER**   |

### Front-End
O que será abordado:
- Gerenciador de Pacotes;
- Restauração de pacotes;
- Como inicializar o projeto;
- Variáveis de ambiente;

#### Restauração de pacotes

Deve-se abrir uma janela do terminal na pasta em que o projeto está e executar o seguinte comando:

```terminal
npm install
```

#### Como inicializar o projeto

Deve-se abrir uma janela do terminal na pasta em que o projeto está e executar o seguinte comando:

```terminal
npm run dev
```

#### Variáveis de ambiente

As variáveis são:

| Chave        | Valor                 |
| ------------ |  -------------------- |
| VITE_API_URL | http://localhost:5262 |
