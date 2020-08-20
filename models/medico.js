const { Schema, model } = require('mongoose');


const medicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
}, { collection: 'Medicos' });

medicoSchema.method('toJSON', function() {
    const { __v, _id, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;
});

module.exports = model('Medico', medicoSchema);