# desafio-frontend-liberfly

## Instalação
```
yarn install
```

### Build de desenvolvimento
```
yarn serve
```

Seguindo padrões de segurança, as chaves da API não estão disponíveis nesse repositório público.

Na raiz do projeto, crie um arquivo `.env` com as chaves `VUE_APP_PUBLIC_KEY` e `VUE_APP_PRIVATE_KEY`, e atribua os devidos valores de acordo com suas chaves da API da Marvel.

### Compilar para produção
```
yarn build
```

# Considerações
Projeto online [aqui](https://desafio-frontend-liberfly.vercel.app/)

## Framework
A framework utilizada no projeto foi a versão 3 do Vue.js, o template inicial foi gerado pelo Vue CLI e a framework CSS utilizada foi o Tailwind CSS.

## Soluções
### Chamadas à API da Marvel
Para fazer as chamadas à API, criei uma função composable que gera o hash necessário para ser autorizado (como diz a documentação da API), e toma como argumentos o endpoint e os parâmetros disponíveis.

### Gerenciamento de estado
Utilizei um único Vuex module (informações do carrinho).

### Tratamento de dados
Como a API contém alguns dados incompletos, como imagens e preços, retirei da lista de produtos (através de um `Array.filter()`) as HQs sem imagem e atribuí um único preço a todos os produtos.

Os produtos raros são definidos através de um `Math.random()` que retorna `true` se o resultado é menor ou igual a `0.1`, fazendo com que aproximadamente 10% das HQs sejam classificadas como raras.

### Cupons
A validade e raridade dos cupons são geradas aleatoriamente pelo método `Math.random() > 0.5`.

### Checkout
O valor total da compra é calculado pelo método `Array.reduce()`, quando o carrinho tem mais de 1 item.
