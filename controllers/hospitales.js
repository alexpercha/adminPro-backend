const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospital = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    try {
        res.json({
            ok: 'true',
            hospitales
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'error inesperado'
        });

    }
};

const postHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        await hospital.save();

        res.json({
            ok: 'true',
            hospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'error inesperado'
        });
    }
};

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: 'true',
        msg: 'actualizarHospitales'
    });
};

const borrarHospital = (req, res = response) => {

    res.json({
        ok: 'true',
        msg: 'borrarHospitales'
    });
};

module.exports = {
    getHospital,
    postHospital,
    actualizarHospital,
    borrarHospital
};