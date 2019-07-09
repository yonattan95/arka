const express = require('express');
const api = require('./api');

//variables globales
const app = express();

//middlewares
app.use(api);


//listen
app.listen(8000, () => {
    console.log('App escuchando en el puerto 8000');
});