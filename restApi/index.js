const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');


//Conecatar mongose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/restapis', {
    useNewUrlParser: true
});

//Crear el servidor
const app = express();

//Habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Habilita cors
app.use(cors());

//Rutas de la app
app.use('/', routes());

//Carpeta publica
app.use(express.static('uploads'));

app.listen(5000);