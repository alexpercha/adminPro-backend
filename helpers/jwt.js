const jwt = require('jsonwebtoken');

const generarToken = (uid) => {

    return new Promise((resolve, reject) => {
        const playload = {
            uid
        };

        jwt.sign(playload, process.env.JWT_KEY, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el TOKEN');
            } else {
                resolve(token);
            }
        });

    });

};

module.exports = {
    generarToken
};