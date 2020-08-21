const { response } = require('express');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

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

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const idHospital = req.params.hospital;
    const uid = req.uid;

    try {



        const [medico, hospital] = await Promise.all([
            await Medico.findById(id),
            await Hospital.findById(idHospital)
        ]);

        if (!medico || !hospital) {
            res.status(404).json({
                ok: 'false',
                msg: 'No existe medico o hospital'
            });
        }


        const cambiosMedico = {
            ...req.body,
            usuario: uid,
            hospital: idHospital
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: 'true',
            msg: 'Hospital actualizado',
            medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'Error inesperado'
        });
    }

};

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.status(404).json({
                ok: 'false',
                msg: 'No existe medico'
            });
        }

        const borrarmedico = await Medico.findByIdAndDelete(id);

        res.json({
            ok: 'true',
            msg: 'Hospital eliminado',
            borrarMedico
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
    getMedico,
    postMedico,
    actualizarMedico,
    borrarMedico
};