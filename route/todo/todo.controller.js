require('dotenv').config()

const {
    create_t,
    getTodo,
    getTasksById,
    updateTask,
    deleteTask,
} = require('./todo.service');

module.exports = {
    create_tasks: (req, res) => {
        const body = req.body;
        create_t(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'internal server error'
                })
            }
            getTodo((err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        msg : 'internal server error'
                    });
                }
                return res.status(200).json({
                    data: results
                })
            });
        });
    },
    getTodo: (req, res) => {
        getTodo((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'internal server error'
                });
            }
            return res.status(200).json({
                data: results
            })
        });
    },
    getTasksById: (req, res) => {
        const id = req.params.id;
        getTasksById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'internal server error'
                });
            }
            if (!results) {
                return res.status(404).json({
                    msg: 'Not found'
                });
            }
            return res.status(200).json({
                data: results
            })
        })
    },
    updateTask: (req, res) => {
        const body = req.body;
        body.id = req.params.id;
        updateTask(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'Internal Server Error'
                });
            }
            if (!results) {
                return res.status(500).json({
                    msg: 'Internal Server Error'
                })
            }
            return res.status(200).json({
                message: 'update successfully',
                data: body
            })
        })
    },
    deleteTask: (req, res) => {
        const id = req.params.id;
        deleteTask(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'Internal Server Error'
                });
            }
            if (!results) {
                return res.status(404).json({
                    message: 'not found'
                });
            }
            return res.json({
                message: `succesfully deleted record number : ${id}`
            });
        });
    },
}