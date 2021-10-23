DROP DATABASE IF EXISTS employee_tracker_database;
CREATE database employee_tracker_database;

USE employee_tracker_database;

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  manager_id INTEGER,
  name VARCHAR(50),
  PRIMARY KEY (id),
  INDEX manager (manager_id)
);

CREATE TABLE position (
  id INTEGER NOT NULL AUTO_INCREMENT,
  department_id INTEGER NOT NULL,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  manager_id INTEGER NOT NULL,
  position_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (position_id) REFERENCES position(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);