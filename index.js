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

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));




app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo por purto: ' + process.env.PORT);
});