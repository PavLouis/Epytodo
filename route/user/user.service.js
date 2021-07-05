const db = require('../../config/db')


module.exports = {
    create: (data, callback) => {
        db.query(
        `insert into table_user(email, password, name, firstname)
                        values(?, ?, ?, ?)`,
        [
            data.email,
            data.password,
            data.name,
            data.firstname,
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
        )
    },
    getUsers: callback => {
        db.query(
            `select id, email, password, name, firstname, create_at from table_user`,
            [], 
            (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
            }
        );
    },
    getUsersById: (id, callback) => { //give email to
        db.query(
            `select id, email, password, name, firstname, create_at from table_user where id = ? or email = ?`,
            [id, id], 
            (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
            }
        );
    },
    getUsersByEmail: (email, callback) => {
        db.query(
            `select * from table_user where email = ?`,
            [email], 
            (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        console.log(data.id);
        db.query(
        `update table_user set email = ?, password = ?, name = ?, firstname = ? where id = ?`,
        [
            data.email,
            data.password,
            data.name,
            data.firstname,
            data.id,
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
        )
    },
    deleteUser: (id, callback) => {
        db.query(
            `delete from table_user where id = ?`,
            [id], 
            (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
            }
        );
    },
    getUsersTasks: (id, callback) => {
        db.query(
            `select * from table_todo where user_id = ?`,
            [id], 
            (error, results, fields) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            return callback(null, results);
            }
        );
    },
}