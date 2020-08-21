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
            msg: 'Error inesperado'
        });
    }
};

const actualizarHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: 'false',
                msg: 'No existe hospital'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findOneAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: 'true',
            msg: 'Hospital actualizado',
            hospitalActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'Error inesperado'
        });
    }
};

const borrarHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: 'false',
                msg: 'No existe hospital'
            });
        }

        const borrarHospital = await Hospital.findByIdAndDelete(id);

        res.json({
            ok: 'true',
            msg: 'borrarHospitales',
            borrarHospital
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'Error inesperado'
        });
    }
};

module.exports = {
    getHospital,
    postHospital,
    actualizarHospital,
    borrarHospital
};