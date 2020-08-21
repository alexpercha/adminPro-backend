const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validacion-jwt');
const { validarCampos } = require('../middlewares/validacion-campos');

const router = Router();


router.post('/', [
    check('pass', 'El password es requerido').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'El token de googole es requerido').not().isEmpty(),
    validarCampos
], googleSignIn);

router.get('/renew', [
    validarJWT
], renewToken);

module.exports = router;