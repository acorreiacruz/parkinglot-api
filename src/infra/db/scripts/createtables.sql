-- Active: 1672594723589@@127.0.0.1@54320@projects

CREATE SCHEMA parkinglotca;

create table if not exists parkinglotca.parkinglot(
    code VARCHAR(150),
    capacity INTEGER NOT NULL,
    open_hour INTEGER NOT NULL,
    close_hour INTEGER NOT NULL,
    PRIMARY KEY (code)
);

CREATE TABLE IF NOT EXISTS parkinglotca.parkedcar(
    code VARCHAR(150),
    plate VARCHAR(7) NOT NULL,
    enter_date TIMESTAMP NOT NULL,
    checkout_date TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (code) REFERENCES parkinglotca.parkinglot(code) ON DELETE CASCADE
);