import express from 'express';
import 'express-async-errors';
import path from 'path'
import cors from 'cors';
import './database/connection'

import routes from './routes'
import errorHandler from './errors/handler'

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes)
//retonar todos o caminho da imagem para ser visualizada
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler);

//Rota = conjunto
//Recurso = usuário

//Métodos HTTP = GET, POST, PUT, DELETE

//Parâmetros 
    //Query params: ?search=gabriel
    //Route params: /1 Indentificar um rescurso
    //Body: /1 Corpo da requisição
    
    //Função async para poder usar o await 


app.listen(3333);

// 3 Formas de se trabalhar com banco

/* Driver nativo */
//Permite executar as querys pelo node, porém tem que ser no
//mesmo formato da linguagem do banco

//Query builder
//Utiliza-se o KnexJS, escreve as consultas por JS

//ORM
//Uma classe do JS que simboliza uma tabela no banco
//o resultado vai ser um objeto da intância da classe
