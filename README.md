# 💬 Me Conta

## ✳️ Sobre
O Me Conta é uma plataforma que une jovens que buscam terapia a profissionais de Psicologia

## 🛠 Ferramentas Utilizadas
- [React](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [Jest](https://jestjs.io)
- [Styled Components](https://styled-components.com/)

---

## 💻 Configurando o Ambiente

- Instale o [NVM](https://github.com/nvm-sh/nvm) (Gerenciador de versão do Node) e adicione a versão LTS do [node](https://nodejs.org/en/) ao nvm

- Clone o projeto

  ```bash
  git clone https://github.com/MeConta/me-conta-frontend.git
  ```

- Execute o comando:
  ```bash
  npm install
  ```

--- 

## 🏠  Variáveis de Ambiente (.env.local)
Existe o arquivo `.env` com todas as variáveis utilizadas para rodar o sistema. Para desenvolvimento local, é preciso criar o arquivo `.env.local` na raiz do projeto e adicionar algumas variáveis, conforme abaixo:

> Criar à variável `NEXT_PUBLIC_API_URL` e adicionar o _link_ do backend [local](http://localhost:3000) ou do [Heroku](https://me-conta-backend.herokuapp.com), como no exemplo abaixo:
> - NEXT_PUBLIC_API_URL=http://localhost:3000

---

## ▶️ Executando o projeto

Primeiramente, execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

Para rodar os testes:
```bash
# rodar os testes uma única vez
npm run test

# rodar os testes sempre que houver alguma alteração
npm run test:watch

# rodar os testes com a cobertura
npm run coverage
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado

Você pode editar o arquivo pages/index.tsx para desenvolver. A página se atualiza automáticamente conforme você edita.

---

## :warning: Começando a desenvolver - Conheça o Check in Dance 👣 

O "Check in dance" é uma prática usada para garantir que nosso código esteja sempre atualizado e seguindo os padrões de desenvolvimento definidos pela equipe. Veja o [Passo-a-passo](https://github.com/MeConta/me-conta-frontend/blob/main/check-in-dance.md).

---

## 🚀 Commits no projeto

O projeto possui [husky](https://github.com/typicode/husky) para verificar alguns passos antes de autorizar o commit.

1. Aplicar correções relacionadas à **Lint**;
3. Validação da mensagem de commit conforme as regras do [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/);
  - Padrão no desenvolvimento de um card:
  > tipo(#numero_do_card): descrição em inglês (em letras minúsculas)
  - Padrão de desenvolvimento não relacionado a cards
  > tipo(escopo): descrição em inglês (em letras minúsculas)

Exemplos de tipos:
  - feat: introduz uma nova funcionalidade à base de código;
  - fix: correção de um bug na base de código;
  - build: Introduz uma mudança que afeta o build do sistema ou alguma dependência externa (exemplos de escopos: gulp, broccoli, npm);
  - chore: atualização de ferramentas, configurações e bibliotecas 
  - ci: Introduz uma mudança aos arquivos e scripts de configuração do CI/CD (exemplos de escopos: Travis, Circle, BrowserStack, SauceLabs)
  - docs: Alterações na documentação 
  - style: Introduz uma mudança que não afeta o significado do código (remoção de espaços em branco, formatação, ponto e virgula faltando, etc)
  - refactor: Uma mudança no código que nem corrige um bug nem adiciona uma nova funcionalidade
  - perf: Um mundança no código que melhora a performance
  - test: Adicionar testes faltando ou corrigir testes existentes

Exemplos de commits válidos:
  ```bash
  git commit -m "feat(#300): creating auth service"
  git commit -m "fix(#30): correcting volunteer filter by type"
  git commit -m "style(lint): removing some lint warnings"
  git commit -m "docs(readme): removing deploy section from readme"
  ```
---

## 📘 Storybook

O Storybook é uma ferramenta opensource que prepara um ambiente de desenvolvimento para componentes de UI. Para saber como rodar no projeto [clique aqui](Storybook.md).

---
## 🔗	 Ambiente de desenvolvimento ###

O ambiente de desenvolvimento está no Heroku, e seguem os links abaixo:

| Backend                                  | Swagger                                  | Frontend                                  | Storybook                                  |
|------------------------------------------|-------------------------------------------|------------------------------------------|-------------------------------------------|
| [Backend](https://me-conta-backend.herokuapp.com)| [Swagger](https://me-conta-backend.herokuapp.com/api)| [Frontend](https://me-conta-frontend.herokuapp.com) | [Storybook](https://me-conta-story-book.herokuapp.com) | 

---
