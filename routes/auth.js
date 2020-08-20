const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
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

module.exports = router;