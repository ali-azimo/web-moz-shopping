const expressJWT = require("express-jwt");


function auth() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJWT({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            //Not allowing others post infor, everything after prodcut
            //regular expression
            { url: /\/public\/upload(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}
async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }
    done();
}
module.exports = auth;
//Ainda por estudar