const jwt = require('jsonwebtoken');
let tasksControllers = {};

tasksControllers.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized request');
    }

    // si si hay un headerde 
    // dividir header en el espacio
    console.log('headers', req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];

    if (token === null) {
        res.status(401).send('Unauthorized request');

    }

    // si esta enviando el token
    const payload =  jwt.verify(token, 'secretkey');
    console.log(payload);

}

module.exports = tasksControllers;