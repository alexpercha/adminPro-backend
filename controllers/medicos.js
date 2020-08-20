const { response } = require('express');
const Medico = require('../models/medico');

const getMedico = async(req, res = response) => {

    try {
        const medicos = await Medico.find().populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');
        res.json({
            ok: 'true',
            medicos
        });
    } catch (error) {

    }
};

const postMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        await medico.save();
        res.json({
            ok: 'true',
            medico
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'Error inesperado'
        });
    }
};

const actualizarMedico = (req, res = response) => {

    res.json({
        ok: 'true',
        msg: 'actualizarMedicos'
    });
};

const borrarMedico = (req, res = response) => {

    res.json({
        ok: 'true',
        msg: 'borrarMedicos'
    });
};

module.exports = {
    getMedico,
    postMedico,
    actualizarMedico,
    borrarMedico
};