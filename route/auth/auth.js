require('dotenv').config();
const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if (token) {
            token = token.slice(7); //delete "bearer "
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.json({
                        msg: 'Token is not valid'
                    })
                } else {
                    next();
                }
            })
        } else {
            res.json({
                msg: 'No token , authorization denied'
            })
        }
    }
}