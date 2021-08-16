const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes'); //todas as rotas do back-end
const app = express(); //configs do servidor

//informações para o acesso ao banco de dados
const database_name = 'databaseweek';
const connection_username = 'omnistack';
const connection_password = 'omnistack';

// conexão com mongodb
const connection_url = `mongodb+srv://${connection_username}:${connection_password}@omnistack-week-10.k83s7.mongodb.net/${database_name}?retryWrites=true&w=majority`;
const server_configs = 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };


mongoose.connect(connection_url, server_configs);

//req.query - Acessar dados aclopados como argumentos (get)
//req.params - Acessar dados dentro da rota da requisição (put / delete)
//req.body - Acessar dados que foram enviados no body da requisição

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);

