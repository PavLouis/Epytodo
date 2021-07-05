require('dotenv').config()

const {
    create, 
    getUsers,
    getUsersById,
    getUsersByEmail,
    updateUser,
    deleteUser,
    getUsersTasks,
} = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign, decode } = require('jsonwebtoken')
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                return res.status(208).json({
                    msg: "account already exists"
                })
            }
            const jsontoken = sign( { results: results }, process.env.SECRET_KEY);
            return res.status(200).json({
                token: jsontoken
            });
        });
    },
    getUsersById: (req, res) => {
        const id = req.params.id;
        getUsersById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results || results.length == 0) {
                return res.status(404).json({
                    message: 'not found'
                });
            }
            return res.status(200).json({
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    message: 'not found'
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        body.id = req.params.id;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'internal error server'
                });
            }
            if (!results) {
                return res.status(417).json({
                    msg: 'Failed to update user'
                })
            }
            return res.status(200).json({
                message: 'update successfully',
                data: body
            })
        })
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    message: 'not found'
                });
            }
            return res.status(200).json({msg: `succesfully deleted record number : ${id}`});
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUsersByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.status(400).json({
                    data: 'Invalid Credentials'
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                // results.password = undefined;
                const jsontoken = sign( { results: results }, process.env.SECRET_KEY);
                return res.status(200).json({
                    token: jsontoken
                });
            } else { 
                return res.status(400).json({
                    data: 'Invalid Credentials'
                });
            }
        })
    },
    getUsersTasks: (req, res) => {
        let token = req.get('authorization');
        token = token.slice(7); //delete "bearer "
        let resultat = decode(token, process.env.SECRET_KEY);
        let recv = JSON.parse(JSON.stringify(resultat));
        const id = recv.results.insertId;
        getUsersTasks(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'internal server error'
                });
            }
            if (!results) {
                return res.status(400).json({
                    message: 'not found'
                });
            }
            return res.status(200).json({
                data: results
            })
        })
    }
}