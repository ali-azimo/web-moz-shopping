function Servererror(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
       return res.status(401).send({ message: 'The user is not Authorized' });
    }
    if (err.name === 'ValidarionError') {
       return res.status(401).send({ message: err });
    }
    return res.status(500).send({ err});
}
module.exports = Servererror;