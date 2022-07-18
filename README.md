# 💬 Me Conta

## ✳️ Sobre
O Me Conta é uma plataforma que une jovens que buscam terapia a profissionais de Psicologia

## 🛠 Ferramentas Utilizadas
- React
- NextJS
- Jest
- Styled Components

## 💻 Configurando o Ambiente

- Instale o Node -
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

- Clone o Repositório
```
bash
git clone https://github.com/MeConta/me-conta.git
````

- Execute o comando:
```
bash
npm install
```

## 🏠  Variáveis de Ambiente (.env.local)
Para desenvolvimento local, é necessário criar o arquivo `.env.local` na raiz do projeto e adicionar as variáveis necessárias.
> Criar à variável `NEXT_PUBLIC_API_URL` e adicionar o _link_ do backend [local](http://localhost:3000) ou do [Heroku](https://me-conta-backend.herokuapp.com), como no exemplo abaixo:
> - NEXT_PUBLIC_API_URL=http://localhost:3000
---

## ▶️ Executando o projeto

Primeiramente, execute o servidor de desenvolvimento:
```
bash
npm run dev
# ou
yarn dev
```

Para rodar os testes:
```
bash
npm run test
ou
npm run coverage
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado

Você pode editar o arquivo pages/index.tsx para desenvolver. A página se atualiza automáticamente conforme você edita.

## 🚀 Contribuindo com o projeto

Foi adicionado ao projeto o [husky](https://github.com/typicode/husky) para verificar alguns passos antes de autorizar o commit.

1. Aplicar correções relacionadas à lint;
2. Rodar bateria de testes do projeto;
3. Validação da mensagem de commit nas regras do [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/);

Para validação da mensagem de commit foi integrado ao [husky](https://github.com/typicode/husky) o [commitlint](https://github.com/conventional-changelog/commitlint).

- Padrão utilizado:
```
tipo(#código-tarefa): descrição
```

- Exemplo de commit válido:
```
bash
git commit -m"feat(#18): implementa testes unitários"
```

Para mais detalhes sobre commits válidos consultar [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/).

## 👣 Check in dance
[Passos](https://github.com/MeConta/me-conta/blob/main/check-in-dance.md) para atualizar as mudanças locais no github

## Storybook
para saber como rodar nosso [clique aqui](Storybook.md)
