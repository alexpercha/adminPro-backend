const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getBusqueda = async(req, res = response) => {

    const busquedaDb = req.params.busqueda;
    const regExp = new RegExp(busquedaDb, 'i');

    try {

        // const buscarUsuario = await Usuario.find({ nombre: regExp });
        // const buscarHospitales = await Hospital.find({ nombre: regExp });
        // const buscarMedico = await Medico.find({ nombre: regExp });

        const [buscarUsuario, buscarHospitales, buscarMedico] = await Promise.all([
            Usuario.find({ nombre: regExp }),
            Hospital.find({ nombre: regExp }),
            Medico.find({ nombre: regExp })
        ]);

        res.json({
            ok: 'true',
            buscarUsuario,
            buscarHospitales,
            buscarMedico
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'error inesperado'
        });

    }
};

const getBusquedaColeccion = async(req, res = response) => {

    const tablaDb = req.params.tabla;
    const busquedaDb = req.params.busqueda;
    const regExp = new RegExp(busquedaDb, 'i');
    let data = [];

    try {

        switch (tablaDb) {
            case 'Usuarios':
                data = await Usuario.find({ nombre: regExp });
                break;
            case 'Hospitales':
                data = await Hospital.find({ nombre: regExp }).populate('usuario', 'nombre');
                break;
            case 'Medicos':
                data = await Medico.find({ nombre: regExp })
                    .populate('usuario', 'nombre')
                    .populate('hospital', 'nombre');
                break;

            default:
                return res.status(500).json({
                    ok: 'false',
                    msg: 'La tabla ' + tablaDb + ' no existe'
                });
        }


        res.json({
            ok: 'true',
            data
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'error inesperado'
        });

    }
};


module.exports = {
    getBusqueda,
    getBusquedaColeccion
};