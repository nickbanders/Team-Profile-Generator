const inquirer = require("inquirer");
const fileWrite = require('./src/generate');
const generatePage = require('./src/template');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const addMngr = () => {
    return inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?",
            validate: (nameInput) => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a name");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's ID?",
            validate: (idInput) => {
                if (idInput) {
                    return true;
                } else {
                    console.log("Please enter an ID");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's e-mail address?",
            validate: (emailInput) => {
                if (emailInput) {
                    return true;
                } else {
                    console.log("Please enter an e-mail address");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?",
            validate: (officeNumber) => {
                if (officeNumber) {
                    return true;
                } else {
                    console.log("Please enter an office number");
                    return false;
                }
            }
        }
    ])
    .then(managerAnswers => {
        const topPage = generatePage.generateTop();
        fileWrite.writeFile(topPage);
        const { name, id, email, officeNumber } = managerAnswers;
        const manager = new Manager(name, id, email, officeNumber);
        const managerHTML = generatePage.addManager(manager);
        fileWrite.appendFile(managerHTML);
    })
};

const addEmployees = () => {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'role',
          message: "What team role would you like to add?",
          choices: ['Engineer', 'Intern']
        },
        {
          type: 'input',
          name: 'name',
          message: "What is the name of the team member?",
          validate: name => {
            if(name) {
              return true;
              } else {
                console.log("Please enter the name of the team member.");
                return false;
                }
            }
        },
        {
          type: 'input',
          name: 'id',
          message: "What is the ID of your team member?",
          validate: id => {
            if(id) {
              return true;
              } else {
                console.log("Please enter an ID number.");
                return false;
                }  
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the e-mail for your team member?",
            validate: email => {
              if(email) {
                return true;
                } else {
                  console.log("Please enter an e-mail.");
                  return false;
                  }  
              }
          },
          {
            type: 'input',
            name: 'github',
            message: "What is the Github for your team member?",
            when: (input) => input.role === "Engineer",
            validate: github => {
              if(github) {
                return true;
                } else {
                  console.log("Please enter a Github username.");
                  return false;
                  }  
              }
          },
          {
            type: 'input',
            name: 'school',
            message: "What school is your team member affiliated with?",
            when: (input) => input.role === "Intern",
            validate: school => {
              if(school) {
                return true;
                } else {
                  console.log("Please enter a school name.");
                  return false;
                  }  
              }
          },
          {
              type: 'confirm',
              name: 'confirmEmployees',
              message: "Would you like to add more team members?",
              default: false
          },
        ])
        .then(employeeInfo => {
            let { role, name, id, email, github, school, confirmEmployees } = employeeInfo;

            if(role === "Engineer") {
                let engineer = new Engineer(name, id, email, github);
                let engineerHTML = generatePage.addEngineer(engineer);
                fileWrite.appendFile(engineerHTML);
            }

            else if(role === "Intern") {
                let intern = new Intern(name, id, email, school);
                let internHTML = generatePage.addIntern(intern);
                fileWrite.appendFile(internHTML);
            }

            if(confirmEmployees) {
                addEmployees();
            }
        })

};

addMngr()
  .then(addEmployees)
  .then(fileWrite.appendFile(generatePage.generateBottom()))
  .then(fileWrite.copyFile());