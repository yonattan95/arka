const express = require('express');
const api = require('./api');
const cors = require('cors');

//variables globales
const app = express();

//middlewares
app.use(cors());
app.use(express.static('uploads/'));
app.use('/',api);

//listen
app.listen(8000, () => {
    console.log('App escuchando en el puerto 8000');
});