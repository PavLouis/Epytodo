const db = require('../../config/db')


module.exports = {
    create_t: (data, callback) => {
        db.query(
        `insert into table_todo(title, description, due_time, user_id, status)
                        values(?, ?, ?, ?, ?)`,
        [
            data.title,
            data.description,
            data.due_time,
            data.user_id,
            data.status
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
        )
    },
    getTodo: callback => {
        db.query(
            `select * from table_todo`,
            [], 
            (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
            }
        );
    },
    getTasksById: (id, callback) => {
        db.query(
            `select * from table_todo where id = ?`,
            [id], 
            (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            if (results.length === 0) {
                return callback(null, null)
            }
            return callback(null, results);
            }
        );
    },
    updateTask: (data, callback) => {
        db.query(
        `update table_todo set title = ?, 
        description = ?, 
        due_time = ?, 
        user_id = ?, 
        status = ? 
        where id = ?`,
        [
            data.title,
            data.description,
            data.due_time,
            data.user_id,
            data.status,
            data.id
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
        )
    },
    deleteTask: (id, callback) => {
        db.query(
            `delete from table_todo where id = ?`,
            [id], 
            (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
            }
        );
    },
}