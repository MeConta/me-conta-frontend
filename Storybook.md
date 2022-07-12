# Storybook

## O que é?
O Storybook é uma ferramenta opensource que prepara um ambiente de desenvolvimento para componentes de UI.

Ele possui um CLI para ser utilizado no terminal, isso quer dizer que dentro desta ferramenta podemos organizar nossos componentes.

Ele nos permite desenvolver e testar componentes de uma forma isolada da nossa aplicação.

Fonte: https://blog.geekhunter.com.br/storybook/

## Build
``` shell
npm run build-storybook
```

## Como rodar local?
```shell
npm run storybook
```

## Como rodar via Docker?
```shell
docker build . -f Dockerfile.storybook -t me-conta_storybook:latest

docker run -p 8080:80 me-conta_storybook:latest
```

