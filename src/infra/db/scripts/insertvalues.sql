-- Active: 1672411513112@@127.0.0.1@54320@cleanarch@public
INSERT INTO project.parkinglot(code, capacity, open_hour, close_hour) VALUES
('Iguatemi Shopping', 5, 8, 22),
('Burguer King', 10, 6, 24),
('Movie Theater', 50, 8, 21);

INSERT INTO project.parkedcar(code, plate, enter_date) VALUES
('Burguer King', 'ABC1D23', '2022-12-30T11:30:00'),
('Burguer King', 'ABC2D34', '2022-12-30T10:00:00'),
('Burguer King', 'ABC3D45', '2022-12-30T15:00:00'),
('Iguatemi Shopping', 'XLF1T45', '2022-12-31T9:00:00'),
('Iguatemi Shopping', 'LVP2G30', '2022-12-31T14:00:00');