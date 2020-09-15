const express = require('express');
const path = require('path');

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

//directorio publico

app.use(express.static('public'));


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo por purto: ' + process.env.PORT);
});