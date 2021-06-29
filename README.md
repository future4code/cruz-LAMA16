# Labenu Music Awards

##SURGE FRONT : http://lama16-front.surge.sh/

##ENDPOINTS

####Criar tabelas
* POST */tables*

####Criar usuário
*  POST */user/signup* <br>
body -> name, email, password, role

#### Login do usuário
* POST */user/login* <br>
  body -> email, password

####Criar banda
* POST */band/create* <br>
  body -> name, music_genre, responsible <br>
  Authorization -> token

#### Buscar banda pelo id ou name
* GET */band/:idOrName

#### Criar show
* POST */show/create* <br>
  body -> weekDay, startTime, endTime, bandId
  Authorization -> token

#### Buscar todos os shows de um dia
* GET */show/:weekDay*

#### Criar ingresso
* POST */show/ticket* <br>
	body -> name, showId, value, ticketsQuantity <br>
  Authorization -> token

#### Comprar ingresso
* PUT */show/ticket* <br>
	body -> name, ticketsQuantity <br>
  Authorization -> token

#### Adicionar uma foto
* PUT */show/photo/:showId <br>
	body -> url
  Authorization -> token

#### Obter todas as fotos
* GET */show/photo* <br>
	