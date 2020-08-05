/*jshint esversion: 6 */
const express = require('express');

// amibiente
require('dotenv').config();

// CORS
const cors = require('cors');


const { dbConnection } = require('./database/config');

// user - pass
// mean-user - Dayalex01

// Crea el servidor Express
app = express();

// Configuaracion Cors
app.use(cors());

// Base de datos
dbConnection();


// Rutas
app.get('/', (req, res) => {
    res.status(400).json({
        ok: 'true',
        msg: 'Hola Mundo'
    });
});



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo por purto: ' + process.env.PORT);
});