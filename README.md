# Loja de Conveniência

## Descrição
O sistema **loja de conveniência** serve para ...

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