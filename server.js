const mysql = require('mysql');
const inquirer = require('inquirer');
const connect = mysql.createConnection({
    host: 'localhost',
    database: 'employee_tracker_db',
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
    switch(answer.database_options) {
        case 'View Departments':
            console.log('is it working?')
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
    connect.query(`SELECT * FROM department`, (err, department) => {
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
    connect.query(`SELECT * FROM positions`,
                (err, res) => {
                  if (err) {
                      console.error(err);
                  } else {
                      console.log(`
                      -- Positions --
                      `); 
                      console.table(res);
                      questionList();
        }
    })
}
// View the employees and their information
const viewEmployees = () => {
    connect.query(`SELECT * FROM employees`,
              (err, res) => {
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
const addDepartment = () => {
    console.log(`
    -- Add Department --
    `);

    connect.query(`SELECT * FROM department`, (err, res) => {
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
            .then((answer) => {
                console.log(answer);
                const composer = 'composer';
                connect.query(`INSERT INTO department (name) VALUES ${answer.departmentName}`, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`
                        -- ${answer.departmentName} successfully added to the database --
                        `);
                        questionList();
                    }
                })
            })
        }
    })
    // a promise to check for an error if one pops up
}
// Add another position to the database
const addPosition = () => {
    console.log(`
    -- Add Position --
    `);

    connect.query(`SELECT * FROM department`, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            const departmentChoices = res.map(({ name, id }) => ({name: name, value: id}));
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
                        return /^[0-9][A-Za-z0-9 -]*$/.test(isNumber)
                    }
                },
                {
                    type: 'list',
                    name: 'departmentSort',
                    message: 'Which department will this new position be in?',
                    choices: departmentChoices
                }
            ])
            .then((answer) => {
                const departmentAnswer = answer.department;
                connect.query(`
                INSERT INTO positions (title, salary, department_id)
                VALUES (?,?,?)`, [answer.addPosition, answer.salaryAmount, departmentAnswer],
                function(err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`
                        -- ${answer.addPosition} has been added as a new position in the employee database! --
                        `);
                        questionList();
                    }
                })
            })
        }
    })
}
// An array to choose positions from for new employees.. this will come in handy in just a sec
const choosePosition = () => {
    positionList = [];
    connect.query(`SELECT * FROM positions`, (err, positions) =>{
        if(err){
            console.error(err);
        } else {
            for(x=0; x<positions.length; x++){
                positionList.push(positions.title);  // I kept having some trouble right here, I am 
            }                                        // pretty sure that my syntax is off, somewhere...
        }
    });
    return positionList;
}
// Add another employee to the database
const addEmployee = () => {
    console.log(`
    -- Add Employee --
    `);
    connect.query(`SELECT * FROM employees`, (err, res) =>{
        if (err) {
            console.error(err);
        } else {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employee\'s first name?',
                    validate: function(isString) {
                        if(isString === ''){
                            return 'Please enter a valid name';
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employee\'s last name?',
                    validate: function(isString) {
                        if(isString === ''){
                            return 'Please enter a valid name';
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'currentPosition',
                    message: 'What position does this employee have?',
                    choices: choosePosition()
                }
            ])
            .then((answer) =>{
                connect.query(`
                INSERT INTO employees (first_name, last_name, positions_id, manager_id)
                VALUES (?,?,?,?)`, [answer.firstName, answer.lastName],
                function(err){
                    if(err){
                        console.error(err);
                    } else {
                        console.log(`
                        -- ${answer.firstName} ${answer.lastName} has been added to the database ! --
                        `);
                        viewEmployees();
                    }
                })
            })
        }
    })
    questionList();
}

// End the program altogether, with a goodbye message
const quitProgram = () => {
    console.log(`
    -- Thank you for using our Employee Database! --
    `);
    process.exit(0);
}
init();