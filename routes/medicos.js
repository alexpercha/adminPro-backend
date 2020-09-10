/*
    RUTA: '/api/medicos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getMedico, postMedico, actualizarMedico, borrarMedico, getMedicoId } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validacion-campos');
const { validarJWT } = require('../middlewares/validacion-jwt');


const router = Router();

router.get('/', [validarJWT], getMedico);

router.get('/:id', [
    validarJWT,
    check('id', 'Id no valido').not().isEmpty(),
], getMedicoId);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El ID del hospital no es valido').isMongoId(),
    validarCampos
], postMedico);

router.put('/:id/:hospital', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarMedico);

router.delete('/:id', [
    validarJWT
], borrarMedico);

module.exports = router;