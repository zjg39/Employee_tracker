const mysql = require('mysql2');
const inquirer = require('inquirer');
const connect = mysql.createConnection({
    host: 'localhost',
    db: 'employee_tracker_db',
    user: 'root',
    password: 'RootBee39!'
})

// Start the process
const init = () => {
    console.log('Welcome to the Employee Database!')
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






init();