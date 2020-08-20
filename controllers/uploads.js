const { response } = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { actualizarimagen } = require('../helpers/actualizar-imagen');


const putUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const uid = req.params.id;
    const tipoValido = ['usuarios', 'medicos', 'hospitales'];


    if (!tipoValido.includes(tipo)) {
        return res.status(400).json({
            ok: 'false',
            msg: 'Tipo no valido'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: 'false',
            msg: 'No existe archivo'
        });
    }

    // validar extencion

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    const extesionValidos = ['png', 'jpg', 'gif', 'jpeg'];

    if (!extesionValidos.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: 'false',
            msg: 'Extension no valida'
        });
    }

    // generra nombre al archivo

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                ok: 'false',
                msg: 'Error al mover la imagen'
            });
        }

        actualizarimagen(tipo, uid, nombreArchivo);

        res.json({
            ok: 'true',
            msg: 'Archivo cargado exitosamente',
            nombreArchivo
        });
    });
};

const getUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const file = req.params.file;

    // imagen por defecto
    let pathImg = path.join(__dirname, `../uploads/${tipo}/${file}`);

    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../uploads/no-image.jpg`);
    }
    res.sendFile(pathImg);
};



module.exports = {
    getUpload,
    putUpload
};