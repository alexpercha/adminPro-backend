const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({
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
    }
}, { collection: 'Hospitales' });

HospitalSchema.method('toJSON', function() {
    const { __v, _id, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;
});

module.exports = model('Hospital', HospitalSchema);