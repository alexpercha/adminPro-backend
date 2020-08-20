const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario.find({}, 'nombre email role google')
    //     .skip(desde).limit(5);
    // const total = await Usuario.count();

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde).limit(5),

        Usuario.countDocuments()
    ]);

    res.status(400).json({
        ok: 'true',
        usuarios,
        uid: req.uid,
        total
    });

};

const postUsuarios = async(req, res = response) => {

    const { email, pass, nombre } = req.body;


    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: 'false',
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.pass = bcrypt.hashSync(pass, salt);

        // Grabar en base de datos
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarToken(usuario.id);

        res.status(400).json({
            ok: 'true',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }
};

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;


    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: 'false',
                msg: 'usuario no existe'
            });
        }

        // actualizar ususario
        const { pass, google, email, ...campos } = req.body;

        if (usuarioDB.email != email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: 'false',
                    msg: 'Ya existe este correo'
                });
            }
        }

        campos.email = email;
        const actualizarUsuario = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: 'true',
            actualizarUsuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }
};

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {

        const buscarUsuario = Usuario.findById(uid);

        if (!buscarUsuario) {
            return res.status(404).json({
                ok: 'false',
                msg: 'No existe Usuario'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: 'true',
            msg: 'Usuario eliminado'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }
};

module.exports = {
    getUsuarios,
    postUsuarios,
    actualizarUsuario,
    borrarUsuario
};