const mysql = require('mysql');
const inquirer = require('inquirer');
const connect = mysql.createConnection({
    host: 'localhost',
    db: 'employee_tracker_db',
    user: 'root',
    password: 'RootBee39!'
})

// Start the process
const init = () => {
    console.log(`
    -- Welcome to our Employee Database! Please select from the following options... --
    `)
    questionList();
}

// End the process
const quitProgram = () => {
    console.log(`
    -- Thank you for using our Employee Database! --
    `);
    process.exit(0);
}
const questionList = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to modify?',
            name: 'database_options',
            choices: [
                'View Departments',
                'View Positions',
                'View Employees',
                'Add Department',
                'Add Position',
                'Add Employee',
                'Quit'
            ]
        }
    ])
// Depending on the user's choice, a different function will execute.  A switch/case seemed like the
// effective way to deal with this.
.then ((answer) =>{
    switch(answer.option) {
        case 'View Departments':
            viewDepartments();
            break;
        case 'View Positions':
            viewPositions();
            break;
        case 'View Employees':
            viewEmployees();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Add Position':
            addPosition();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Quit':
            quitProgram();
            break;
        }
    })
};
const viewDepartments = () => {
    db.query(`SELECT id, department.name AS Name FROM department`, (err, department) => {
        if (err){
            console.error(err);
        } else {
            console.log(`
            -- Departments --
            `);
            console.table(department);
            questionList();
        }
    })
}
const viewPositions = () => {
    db.query(`SELECT positions.id
              positions.title AS title,
              positions.salary AS salary,
              positions.department_id AS department,
              FROM positions
              LEFT JOIN department ON positions.department_id = department.id
              `, (err, res) => {
                  if (err) {
                      console.error(err);
                  } else {
                      console.log(`
                      -- Positions --
                      `); 
                      console.log(res);
                      questionList();
        }
    })
}
// View the employees and their information
const viewEmployees = () => {
    db.query(`
    SELECT employees.id,
           employees.first_name AS firstName,
           employees.last_name AS lastName,
           employees.positions_id AS title,
           positions.salary AS salary,
           department.name AS department,
           FROM employees
           LEFT JOIN department ON positions.department_id = department.id,
           LEFT JOIN manager ON manager.id = employees.manager_id,
           ORDER BY employees.id
           `, (err, res) => {
               if (err) {
                   console.error(err);
               } else {
                   console.log(`
                   -- Employees --
                   `);
                   console.table(res);
                   questionList();
        }
    })
}
// Add another department to the database
const createDepartment = () => {
    console.log(`
    -- Add Department --
    `);

    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.table(res);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is your new department\'s name?'
                }
            ])
        }
    })
    // a promise to check for an error if one pops up
    .then((answer) => {
        db.query(`INSERT INTO department (name)VALUES (?)`, [answer.department]), (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`
                -- ${answer.department} successfully added to the database --
                `);
                questionList();
            }
        }
    })
}
// Ad another position to the database
const creatPosition = () => {
    console.log(`
    -- Add Position --
    `);

    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            const departmentChoices = department.map(({ name, id }) => ({name: name, value: id}));
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'positionName',
                    message: 'What is your new position\'s name?',
                    validate: function(isValid) {
                        if(isValid === ''){
                            return 'Please enter a valid response';
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salaryAmount',
                    message: 'What is the new position\'s salary?',
                    validate: function(isNumber) {
                        if(isNAN(isNumber) || Number === ''){
                            return 'Please enter a valid response';
                        } else {
                            return true;
                        }
                    }
                }
            ])
        }
    })
}



init();