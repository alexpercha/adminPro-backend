/*
    RUTA: '/api/medicos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getMedico, postMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validacion-campos');
const { validarJWT } = require('../middlewares/validacion-jwt');


const router = Router();

router.get('/', getMedico);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El ID del hospital no es valido').isMongoId(),
    validarCampos
], postMedico);

router.put('/:id', actualizarMedico);

router.delete('/:id', borrarMedico);

module.exports = router;