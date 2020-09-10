const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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
            ok: 'false',
            msg: 'hable con el admin'
        });
    }
};

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);
        let usuario;

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            //si no existe
            usuario = new Usuario({
                nombre: name,
                email,
                pass: '@@@',
                img: picture,
                google: true
            });
        } else {
            // si existe
            usuario = usuarioDB;
            usuario.google = true;
        }
        // guardar base de datos
        await usuario.save();
        const token = await generarToken(usuario.id);

        res.json({
            ok: 'true',
            token
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: 'false',
            msg: 'Token no valido'
        });

    }
};

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    const token = await generarToken(uid);
    const usuario = await Usuario.findById(uid);
    res.json({
        ok: 'true',
        msg: 'Token generado',
        token,
        usuario
    });
};

module.exports = {
    login,
    googleSignIn,
    renewToken
};