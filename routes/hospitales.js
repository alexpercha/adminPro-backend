/*
    Path: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validacion-campos');
const { validarJWT } = require('../middlewares/validacion-jwt');
const { getHospital, postHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();

router.get('/', getHospital);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatirio').not().isEmpty(),
    validarCampos
], postHospital);

router.put('/:id', actualizarHospital);

router.delete('/:id', borrarHospital);



module.exports = router;