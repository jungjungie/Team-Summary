const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
// const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function validateName(name) {
    if (name.match(/[a-zA-Z]/)) {
        return true;
    }
    return ('Enter a valid name.')
}

function validateEmail(email) {
    if (email.match(/\S+@\S+\.\S+/)) {
        return true;
    }
    return ('Enter a valid email address.')
}

function validateId(id) {
    if (id.match(/^[1-9]\d*$/)) {
        return true;
    }
    return ('Enter a valid id (numbers only).')
}

function validateLettNum(lettNum) {
    if (lettNum.match(/^[A-Za-z0-9_-]+$/)) {
        return true;
    } 
    return ('Input must include letters and/numbers.')
}

function validateSchool(school) {
    if (school.match(/^[A-Za-z\s]+$/)) {
        return true;
    } 
    return ('Enter a valid school name.')
}

const mgrQuestions = [
    {
        message: "What is your manager's name?",
        name: "name",
        type: "input",
        validate: validateName
    },
    {
        message: "What is your manager's ID?",
        name: "id",
        type: "input",
        validate: validateId
    },
    {
        message: "What is your manager's email?",
        name: "email",
        type: "input",
        validate: validateEmail
    },
    {
        message: "What is your manager's office number?",
        name: "officeNumber",
        type: "input",
        validate: validateLettNum
    },
]

const eeTypeQuestion = [
    {
        message: "Which type of team member would you like to add?",
        name: "employeeType",
        type: "list",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"]
    }
]

const engineerQuestions = [
    {
        message: "What is your engineer's name?",
        name: "name",
        type: "input",
        validate: validateName
    },
    {
        message: "What is your engineer's ID?",
        name: "id",
        type: "input",
        validate: validateId
    },
    {
        message: "What is your engineer's email?",
        name: "email",
        type: "input",
        validate: validateEmail
    },
    {
        message: "What is your engineer's GitHub username?",
        name: "github",
        type: "input",
        validate: validateLettNum
    },
]

const internQuestions = [
    {
        message: "What is your intern's name?",
        name: "name",
        type: "input",
        validate: validateName
    },
    {
        message: "What is your intern's ID?",
        name: "id",
        type: "input",
        validate: validateId
    },
    {
        message: "What is your intern's email?",
        name: "email",
        type: "input",
        validate: validateEmail
    },
    {
        message: "What is your intern's school?",
        name: "school",
        type: "input",
        validate: validateSchool
    },
]

const employees = [];

async function createMgr() {
    // Asks for mgr info and creates new mgr based on user inputs
    console.log('\nPlease build your team:\n')

    const mgrData = await inquirer.prompt(mgrQuestions)
    let newMgr = new Manager(mgrData.name, mgrData.id, mgrData.email, mgrData.officeNumber);

    employees.push(newMgr);
    addEmployees();
}

async function addEmployees() {

    // Asks what type of team member to add next
    let { employeeType } = await inquirer.prompt(eeTypeQuestion)

    // Asks for engr info and creates new engr based on user inputs
    if (employeeType === 'Engineer') {
        let engrData = await inquirer.prompt(engineerQuestions);
        let newEngr = new Engineer(engrData.name, engrData.id, engrData.email, engrData.github);

        employees.push(newEngr);
        addEmployees();

    // Asks for intern info and creates new intern based on user inputs
    } else if (employeeType === 'Intern') {
        let internData = await inquirer.prompt(internQuestions);
        newIntern = new Intern(internData.name, internData.id, internData.email, internData.school)

        employees.push(newIntern);
        addEmployees();

    // Creates or overwrites team.html with user inputs
    } else {
        console.log(employees);

        fs.writeFile('output/team.html', render(employees), function (err) {
            if (err) throw err;
            console.log('Success! File team.html was created in output folder.')
        })
        
        return;
    }
}

createMgr();