/*
    Path: /api/todo/:busqueda
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validacion-campos');
const { validarJWT } = require('../middlewares/validacion-jwt');
const { getBusqueda, getBusquedaColeccion } = require('../controllers/busquedas');

const router = Router();

router.get('/:busqueda', [
    validarJWT
], getBusqueda);

router.get('/:tabla/:busqueda', [
    validarJWT
], getBusquedaColeccion);


module.exports = router;