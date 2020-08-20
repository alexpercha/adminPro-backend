const fs = require('fs');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


const actualizarimagen = async(tipo, uid, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(uid);
            if (!medico) {
                console.log('No existe medico');
                return false;
            }

            pathViejo = `./uploads/${tipo}/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();

            break;
        case 'hospitales':

            const hospital = await Hospital.findById(uid);
            if (!hospital) {
                console.log('No existe hospital');
                return false;
            }

            pathViejo = `./uploads/${tipo}/${hospital.img}`;

            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();

            break;
        case 'usuarios':

            const usuario = await Usuario.findById(uid);
            if (!usuario) {
                console.log('No existe usuario');
                return false;
            }

            pathViejo = `./uploads/${tipo}/${usuario.img}`;

            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();

            break;

        default:
            break;
    }
};

const borrarImagen = (pathViejo) => {

    if (fs.existsSync(pathViejo)) {
        fs.unlinkSync(pathViejo);
    }
};

module.exports = {
    actualizarimagen
};