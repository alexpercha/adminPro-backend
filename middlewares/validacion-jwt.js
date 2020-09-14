const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: 'false',
            msg: 'No existe token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: 'false',
            msg: 'Token no valido'
        });
    }

};

const validarRole = async(req, res = response, next) => {

    const uid = req.uid;
    const uidParams = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: 'false',
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role != 'ADMIN_ROLE' && uid !== uidParams) {
            return res.status(403).json({
                ok: 'false',
                msg: 'No tiene permiso para esta peticion'
            });
        }

        next();

    } catch (error) {
        return res.status(404).json({
            ok: 'false',
            msg: 'Error inesperado'
        });
    }
};

module.exports = {
    validarJWT,
    validarRole
};