

# Taximanager API
###### HOST: https://mysterious-chamber-34326.herokuapp.com/
Gerenciamento de uso serviço de táxi corporativo por voz.



## Chamanda Código do Usuário [/usuariosid]

###  POST 



Você pode criar sua própria pergunta usando esta ação. 
É preciso um Objeto JSON contendo um código do usuário.

 + **Request** (application/json)
    + Headers
            OAuth: header
```
{
    "cod_user": "<cod_user>"
}
```
            
+ **Response 200** (application/json)
```
{
    "result": <cod_user>,
    "status": true
}
```
+ **Parameters**
    + cod_user (String) - Código do usuário
    
    

## Login do Usuário  [/senha]

###  POST 



Você pode criar sua própria pergunta usando esta ação. É preciso um JSON
Objeto contendo uma pergunta e uma coleção de respostas no
Forma de escolhas.

+ ***Request*** (application/json)
    + Headers
            OAuth: header
```
{
    "senha": "<senha>"
}
```            
+ **Response 200** (application/json)
```
{
    "nome": <cod_user>,
    "status": true
}
```
+ **Parameters**
    + senha (String) - Senha do usuário
    


## Lista de todo Usuários  [/geral]

###  POST



Você pode criar sua própria pergunta usando esta ação. É preciso um JSON
Objeto contendo uma pergunta e uma coleção de respostas no
Forma de escolhas.

+ **Request** (application/json)
    + Headers
            OAuth: header
```
{
    "cod_user": "<cod_user>"
}
```    
+ **Response 200** (application/json)
```
[
    {
        "_id": "59b9e54be32674745075e361",
        "cod_user": "123456789",
        "senha": "123456",
        "username": "Paulo"
    },
    {
        "_id": "59b9e5c6e32674745075e4f5",
        "cod_user": "112233445",
        "senha": "654321",
        "username": "Maria"
    }
]
```
+ **Parameters**
    + cod_user (String) - Necessita de um código de usuário para exibir lista de todos

