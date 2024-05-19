const expressJWT = require("express-jwt");


function auth() {
    const secret = process.env.secret;
    return expressJWT({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/api/v1/users/login',
        ]
    })
}
module.exports = auth;

//Ainda por estudar
