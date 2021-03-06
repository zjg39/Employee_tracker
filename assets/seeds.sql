-- Values for each department, by name.
INSERT INTO department (name)
VALUES ('Software Engineering'),
       ('Marketing'),
       ('Legal'),
       ('Accounting');

-- Values for positions: position, salary, department ID.
INSERT INTO positions (title, salary, department_id)
VALUES ('Tech Lead', 250000, 1),
       ('Senior Engineer', 150000, 1),
       ('Software Engineer', 110000, 1),
       ('Marketing Lead', 200000, 2),
       ('Marketing Analyst', 120000, 2),
       ('Legal Manager', 200000, 3),
       ('Attourney', 100000, 3),
       ('Accountant', 180000, 4);

-- Values for individual employees (They are all composers of classical music).
INSERT INTO employees (first_name, last_name, manager_id, positions_id)
VALUES ('Brahms', 'Johannes', NULL, 1),
       ('Mendelssohn', 'Felix', 1, 2),
       ('Dvorak', 'Antonin', 1, 3),
       ('Stravinsky', 'Igor', NULL, 4),
       ('Shostakovich', 'Dmitri', 4, 5),
       ('Bernstein', 'Leonard', NULL, 6),
       ('Barber', 'Samuel', 6, 7),
       ('Hindemith', 'Paul', NULL, 8);


-- Note: the order of these insertions had to correspond with the order of the tables in
-- the schema file, or I'd get a bunch of errors.


-- Select everyting from the tables in order to show them.
SELECT * FROM positions;
SELECT * FROM employees;
SELECT * FROM department;