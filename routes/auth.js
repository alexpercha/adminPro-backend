const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validacion-campos');

const router = Router();


router.post('/', [
    check('pass', 'El password es requerido').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], login);


module.exports = router;