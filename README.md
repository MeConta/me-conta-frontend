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
