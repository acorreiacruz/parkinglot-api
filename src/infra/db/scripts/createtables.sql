-- Active: 1672411513112@@127.0.0.1@54320@cleanarch

CREATE SCHEMA project;

create table if not exists project.parkinglot(
    code VARCHAR(150),
    capacity INTEGER NOT NULL,
    open_hour INTEGER NOT NULL,
    close_hour INTEGER NOT NULL,
    PRIMARY KEY (code)
);

CREATE TABLE IF NOT EXISTS project.parkedcar(
    code VARCHAR(150),
    plate VARCHAR(7) NOT NULL,
    enter_date TIMESTAMP NOT NULL,
    checkout_date TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (code) REFERENCES project.parkinglot(code) ON DELETE CASCADE
);