const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
// const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const mgrQuestions = [
    {
        message: "What is your manager's name?",
        name: "name",
        type: "input"
    },
    {
        message: "What is your manager's ID?",
        name: "id",
        type: "input"
    },
    {
        message: "What is your manager's email?",
        name: "email",
        type: "input"
    },
    {
        message: "What is your manager's office number?",
        name: "officeNumber",
        type: "input"
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
        type: "input"
    },
    {
        message: "What is your engineer's ID?",
        name: "id",
        type: "input"
    },
    {
        message: "What is your engineer's email?",
        name: "email",
        type: "input"
    },
    {
        message: "What is your engineer's GitHub username?",
        name: "github",
        type: "input"
    },
]

const internQuestions = [
    {
        message: "What is your intern's name?",
        name: "name",
        type: "input"
    },
    {
        message: "What is your intern's ID?",
        name: "id",
        type: "input"
    },
    {
        message: "What is your intern's email?",
        name: "email",
        type: "input"
    },
    {
        message: "What is your intern's school?",
        name: "school",
        type: "input"
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

    // Exits function
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

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
