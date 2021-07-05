CREATE DATABASE IF NOT EXISTS epytodo;

USE epytodo;

CREATE TABLE IF NOT EXISTS table_user
(
    id int UNSIGNED AUTO_INCREMENT,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    name VARCHAR(128) NOT NULL,
    firstname VARCHAR(128) NOT NULL,
    create_at DATE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS table_todo
(
    id int UNSIGNED AUTO_INCREMENT,
    title VARCHAR(128) NOT NULL,
    description VARCHAR(256) NOT NULL,
    create_at DAT E DEFAULT CURRENT_TIMESTAMP,
    due_time DATE NOT NULL,
    status ENUM('not started', 'todo', 'in progress', 'done') NOT NULL, /* set value default to first elem */
    user_id INT UNSIGNED,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES table_user(id)
);