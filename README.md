# is-up
Script simples para monitorar se um host caiu e avisa por telegram.


### Variáveis

Alterar
<CHAT_ID> Pelo ID da conversano telegram ou grupo

<TOKEN> Pelo token do bot

### Monitoramento

Remover os exemplos e colocar outros no lugar, simples :)

```js
watch.socket("Site", "google.com", 80);
watch.socket("Banco de dados", "bancodedados.google.com", 5432);
```
