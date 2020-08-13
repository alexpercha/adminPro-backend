const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, pass } = req.body;

    try {

        // buscar email en base de datos

        const buscaEmail = await Usuario.findOne({ email });

        if (!buscaEmail) {
            return res.status(404).json({
                ok: 'false',
                msg: 'Usuario invalido'
            });
        }

        // validar paassword

        const validarPass = await bcrypt.compareSync(pass, buscaEmail.pass);

        if (!validarPass) {
            return res.status(400).json({
                ok: 'false',
                msg: 'Password invalido'
            });
        }

        // Generar el TOKEN - JWT

        const token = await generarToken(buscaEmail.id);

        res.json({
            ok: 'tue',
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'true',
            msg: 'hable con el admin'
        });
    }
};

module.exports = {
    login
};