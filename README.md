### ABRIR O PROJETO DIRETO NO INSOMNIA

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=IBudget%20APi&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fhttps-github-com-MatheusRic%2FProjeto-Final-M4%2Fdeveloper%2Fconfig.json)

<a name="inicio"></a>

# REQUISIÇOES:

- [Usuarios](#usuario)
- [Clientes](#cliente)
- [Orçamentos](#orcamento)
- [Catgeorias](#categoria)
- [Stacks](#stack)

<a id="usuario"></a>

## REQUISIÇOES DO USUARIO

**_CRIAR USUARIO_**

### URL DA REQUISIÇAO

POST - /users

### CAMPOS DE ENVIO QUE SAO OBRIGATORIOS

- name - deve ser do tipo string;
- email - deve ser do tipo string;
- password - deve ser do tipo string;
- userName - deve ser do tipo string;

### CAMPOS QUE NAO SAO OBRIGATORIOS

- imageUrl - deve ser do tipo string;

#### ESSA ROTA NAO NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADOR

**STATUS 201 CREATED\***

```json
{
  "id": "UUID",
  "name": "nome cadastrado",
  "email": "email cadastrado",
  "position": "ocupaçao cadastrada",
  "imageUrl": "url da imagem selecionada"
}
```

---

**_FAZER LOGIN_**

### URL DA REQUISIÇAO

POST - /users/login

### CAMPOS DE ENVIO QUE SAO OBRIGATORIOS

- email - deve ser do tipo string;
- password - deve ser do tipo string;

#### ESSA ROTA NAO NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADOR

**STATUS 200 LOGGED**

```json
{
  "token": "iausbdfibasidfbouasbdifjbojasdbnfjasbndfjbnasjdkfbjfjduenmeujierne571712365123bhHJujyukjuahudjfksdfsioqwikqwjehujeydhfjkdhHOIAYDHDKEUdhdfadhd63gh4kjm3hj1782j3178dfn2904m-YSAbhd4"
}
```

---

**_LISTAR USUARIOS_**

### URL DA REQUISIÇAO

GET - /users

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
[
	{
		"id": "uuid do usuario",
		"name": "nome do usuarios",
		"email": "email do usuario",
		"position": "ocupaçao do usuario",
		"imageUrl": "url da imagem cadastrada"
	},
	{
		"id": "uuid do usuario",
		"name": "nome do usuarios",
		"email": "email do usuario",
		"position": "ocupaçao do usuario",
		"imageUrl": "url da imagem cadastrada"
	} ...
]
```

---

**_LISTAR USUARIO PELO ID_**

### URL DA REQUISIÇAO

GET - /users/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
{
  "id": "uuid do usuario",
  "name": "nome do usuarios",
  "email": "email do usuario",
  "position": "ocupaçao do usuario",
  "imageUrl": "url da imagem cadastrada"
}
```

---

**_ATUALIZAR USUARIO_**

### URL DA REQUISIÇAO

PATCH - /users/:id

### CAMPOS DE ENVIO

- email - deve ser do tipo string;
- name - deve ser do tipo string;
- userName - deve ser do tipo string;
- position - deve ser do tipo string;
- imageUrl - deve ser do tipo string;

**_TODOS OS CAMPOS SAO OPCIONAIS_**

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

#### SÓ É POSSIVEL ATUALIZAR O USUARIO, SE O MESMO ID PASSADO NA URL FOR O MESMO DO USUARIO LOGADO

### RETORNO ESPERADO

**STATUS 200 UPDATED**

```json
{
  "id": "uuid do usuario",
  "name": "nome atualizado",
  "email": "email atualizado",
  "userName": "userName atualizado",
  "position": "ocupaçao atualizado",
  "imageUrl": "url da imagem atualizado"
}
```

---

**_DELETAR USUARIO_**

### URL DA REQUISIÇAO

DELETE - /users/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

#### SÓ É POSSIVEL DELETAR O USUARIO, SE O MESMO ID PASSADO NA URL FOR O MESMO DO USUARIO LOGADO

### RETORNO ESPERADO

**STATUS 204 DELETED**

[Inicio](#inicio)

---

<a id="cliente"></a>

## REQUISIÇOES DE CLIENTES

**_CRIAR CLIENTE_**

### URL DA REQUISIÇAO

POST - /customers

### CAMPOS DE ENVIO QUE SAO OBRIGATORIOS

- name - deve ser do tipo string;

### CAMPOS QUE NAO SAO OBRIGATORIOS

- isCompany - deve ser do tipo boolean;
- email - deve ser do tipo string;
- contact - deve ser do tipo string;

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADOR

**STATUS 201 CREATED\***

```json
{
  "id": "UUID",
  "name": "nome do cliente",
  "isCompany": true,
  "email": "email do cliente",
  "contact": "contato do cliente"
}
```

---

**_LISTAR CLIENTES_**

### URL DA REQUISIÇAO

GET - /customers

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
[
	{
		"id": "uuid do cliente",
		"name": "nome do cliente",
		"email": "email do cliente",
		"isCompany": true,
		"contact": "contato do cliente"
	},
	{
		"id": "uuid do cliente",
		"name": "nome do cliente",
		"email": "email do cliente",
		"isCompany": true,
		"contact": "contato do cliente"
	} ...
]
```

---

**_Listar CLIENTES PELO ID_**

### URL DA REQUISIÇAO

GET - /customers/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
{
  "id": "uuid do cliente",
  "name": "nome do cliente",
  "email": "email do cliente",
  "isCompany": true,
  "contact": "contato do cliente"
}
```

---

**_ATUALIZAR CLIENTE_**

### URL DA REQUISIÇAO

PATCH - /customers/:id

### CAMPOS DE ENVIO

- email - deve ser do tipo string;
- name - deve ser do tipo string;
- isCompany - deve ser do tipo boolean;
- contact - deve ser do tipo string;

**TODOS OS CAMPOS SAO OPCIONAIS**

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

#### SÓ É POSSIVEL ATUALIZAR O CLIENTE, SO O ID PASSADO NA URL, PERTENCER AO BANCO DE CLIENTES DO USUARIO LOGADO

### RETORNO ESPERADO

**STATUS 200 UPDATED**

```json
{
  "id": "uuid do cliente",
  "name": "nome do cliente alterado",
  "email": "email do cliente alterado",
  "isCompany": true,
  "contact": "contato do cliente alterado"
}
```

---

**_DELETAR CLIENTE_**

### URL DA REQUISIÇAO

DELETE - /customers/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

#### SÓ É POSSIVEL DELETAR O CLIENTE, SE O ID PASSADO NA URL, PERTENCER AO BANCO DE CLIENTES DO USUARIO LOGADO

### RETORNO ESPERADO

**STATUS 204 DELETED**

[Inicio](#inicio)

---

<a id="orcamento"></a>

## REQUISIÇOES DE ORÇAMENTOS

**_CRIAR ORÇAMENTO_**

### URL DA REQUISIÇAO

POST - /budgets

### CAMPOS DE ENVIO QUE SAO OBRIGATORIOS

- projectName - deve ser do tipo string;
- projectTime - deve ser do tipo number/integer;
- budget - deve ser do tipo number/decimal;
- fixedCost - deve ser do tipo number/decimal;
- variableCost - deve ser do tipo number/decimal;
- userId - deve ser do tipo string/ usuario existente;
- categoryId - deve ser do tipo string / categoria existente;
- customerId - deve ser do tipo string / cliente existente;
- budgetStackId - deve ser do tipo string / stack existente;

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADOR

**STATUS 201 CREATED\***

```json
{
  "id": "UUID",
  "projectName": "nome do projeto",
  "projectTime": 10,
  "budget": 10.0,
  "fixedCost": 10.0,
  "variableCost": 10.0,
  "userId": "id do usuario",
  "categoryId": "id da categoria",
  "customerId": "id do cliente",
  "budgetStackId": "id da stack"
}
```

---

**_LISTAR ORÇAMENTOS_**

### URL DA REQUISIÇAO

GET - /budgets

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
[
  {
    "id": "UUID",
    "projectName": "nome do projeto",
    "projectTime": 10,
    "budget": 10.0,
    "fixedCost": 10.0,
    "variableCost": 10.0,
    "userId": "id do usuario",
    "categoryId": "id da categoria",
    "customerId": "id do cliente",
    "budgetStackId": "id da stack"
  },
  {
    "id": "UUID",
    "projectName": "nome do projeto",
    "projectTime": 10,
    "budget": 10.0,
    "fixedCost": 10.0,
    "variableCost": 10.0,
    "userId": "id do usuario",
    "categoryId": "id da categoria",
    "customerId": "id do cliente",
    "budgetStackId": "id da stack"
  }
]
```

---

**_LISTAR ORÇAMENTO PELO ID_**

### URL DA REQUISIÇAO

GET - /budgets/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
{
  "id": "UUID",
  "projectName": "nome do projeto",
  "projectTime": 10,
  "budget": 10.0,
  "fixedCost": 10.0,
  "variableCost": 10.0,
  "userId": "id do usuario",
  "categoryId": "id da categoria",
  "customerId": "id do cliente",
  "budgetStackId": "id da stack"
}
```

---

**_ATUALIZAR ORÇAMENTO_**

### URL DA REQUISIÇAO

PATCH - /budgets/:id

### CAMPOS DE ENVIO

- projectName - deve ser do tipo string;
- projectTime - deve ser do tipo number/integer;
- budget - deve ser do tipo number/decimal;
- fixedCost - deve ser do tipo number/decimal;
- variableCost - deve ser do tipo number/decimal;

**TODOS OS CAMPOS SAO OPCIONAIS**

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

#### SÓ É POSSIVEL ATUALIZAR O CLIENTE, SO O ID PASSADO NA URL, PERTENCER AO BANCO DE CLIENTES DO USUARIO LOGADO

### RETORNO ESPERADO

**STATUS 200 UPDATED**

```json
{
  "id": "UUID",
  "projectName": "nome do projeto atualizado",
  "projectTime": 20,
  "budget": 20.0,
  "fixedCost": 20.0,
  "variableCost": 20.0,
  "userId": "id do usuario",
  "categoryId": "id da categoria",
  "customerId": "id do cliente",
  "budgetStackId": "id da stack"
}
```

---

**_DELETAR ORÇAMENTO_**

### URL DA REQUISIÇAO

DELETE - /budgets/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

#### SÓ É POSSIVEL DELETAR O ORÇAMENTO, SO O ID PASSADO NA URL, PERTENCER AO BANCO DE ORÇAMENTOS DO USUARIO LOGADO

### RETORNO ESPERADO

**STATUS 204 DELETED**

[Inicio](#inicio)

---

<a id="categoria"></a>

## REQUISIÇOES DE CATEGORIAS

**_CRIAR CATEGORIA_**

### URL DA REQUISIÇAO

POST - /categories

### CAMPOS DE ENVIO QUE SAO OBRIGATORIOS

- category - deve ser do tipo string;

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADOR

**STATUS 201 CREATED\***

```json
{
  "id": "UUID",
  "category": "categoria criada"
}
```

---

**_LISTAR CATEGORIAS_**

### URL DA REQUISIÇAO

GET - /categories

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
[
	{
	    "id": "uuid",
  	    "category": "categoria"
	},
	{
	    "id": "uuid",
  	    "category": "categoria"
	}...
]
```

---

**_LISTAR CATEGORIA PELO ID_**

### URL DA REQUISIÇAO

GET - /categories/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
{
  "id": "uuid",
  "category": "categoria"
}
```

---

**_DELETAR CATEGORIA_**

### URL DA REQUISIÇAO

DELETE - /categories/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

#### SÓ É POSSIVEL DELETAR A CATEGORIA, SE O ID PASSADO NA URL, PERTENCER AO BANCO DE CATEGORIAS DO USUARIO LOGADO

### RETORNO ESPERADO

**STATUS 204 DELETED**

[Inicio](#inicio)

---

<a id="stack"></a>

## REQUISIÇOES DE STACK DE ORÇAMENTO

**_CRIAR STACK_**

### URL DA REQUISIÇAO

POST - /stacks

### CAMPOS DE ENVIO QUE SAO OBRIGATORIOS

- stack - deve ser do tipo string;

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADOR

**STATUS 201 CREATED\***

```json
{
  "id": "UUID",
  "stack": "stack criada"
}
```

---

**_LISTAR STACKS_**

### URL DA REQUISIÇAO

GET - /stacks

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
[
	{
	    "id": "uuid",
  	    "stack": "stack"
	},
	{
	    "id": "uuid",
  	    "stack": "stack"
	}...
]
```

---

**_LISTAR STACKS PELO ID_**

### URL DA REQUISIÇAO

GET - /stacks/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA A REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

### RETORNO ESPERADO

**STATUS 200 GET**

```json
{
  "id": "uuid",
  "stack": "stack"
}
```

---

**_DELETAR STACK_**

### URL DA REQUISIÇAO

DELETE - /stacks/:id

### ESSA ROTA NAO NECESSITA DE CORPO PARA REQUISIÇAO

#### ESSA ROTA NECESSITA DE AUTENTICAÇAO

#### SÓ É POSSIVEL DELETAR A STACK, SE O ID PASSADO NA URL, PERTENCER AO BANCO DE STACKS DO USUARIO LOGADO

### RETORNO ESPERADO

**STATUS 204 DELETED**

[Inicio](#inicio)
