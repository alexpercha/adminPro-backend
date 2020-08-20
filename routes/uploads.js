/*
    Path: /api/uploads/:tipo/:id
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validacion-jwt');
const { getUpload, putUpload } = require('../controllers/uploads');
const fileUpload = require('express-fileupload');

const router = Router();


router.use(fileUpload());

router.put('/:tipo/:id', [
    validarJWT
], putUpload);

router.get('/:tipo/:file', [
    validarJWT
], getUpload);



module.exports = router;