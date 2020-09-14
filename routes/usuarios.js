/*
    RUTA: '/api/usuarios'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validacion-campos');
const { validarJWT, validarRole } = require('../middlewares/validacion-jwt');

const router = Router();

router.get('/', [
    validarJWT
], getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email esta vacio o es incorrecto').isEmail(),
    validarCampos
], postUsuarios);

router.put('/:id', [
    validarJWT,
    validarRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').isEmail()
], actualizarUsuario);

router.delete('/:id', [
    validarJWT,
    validarRole,
    check('id', 'El id es obligatorio').not().isEmpty()
], borrarUsuario);

module.exports = router;