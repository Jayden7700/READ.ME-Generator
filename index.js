// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [{
    type: 'input',
    name: 'title',
    message: 'What is the title of your project? (Required)',
    validate: titleInput => {
        if (titleInput) {
            return true;
        } else {
            console.log('Please enter your title!');
            return false;
        }
    }
}, {
    type: 'input',
    name: 'githubUsername',
    message: 'What is your GitHub Username? (Required)',
    validate: githubInput => {
        if (githubInput) {
            return true;
        } else {
            console.log('Please enter your GitHub username!');
            return false;
        }
    }
}, {
    type: "list",
    name: "license",
    message: "Please select which license you would like to use.",
    choices: [
        "APACHE 2.O",
        "BSD 3",
        "GVL-GPL 3.0",
        "MIT",
        "None"
    ],
}, {
    type: 'input',
    name: 'email',
    message: 'What is your email address? (Required)',
    validate: githubInput => {
        if (githubInput) {
            return true;
        } else {
            console.log('Please enter your email address!');
            return false;
        }
    }
}, {
    type: 'input',
    name: 'installation',
    message: 'Please provide step-by-step installation instructions for your project. (Required)',
    validate: installInput => {
        if (installInput) {
            return true;
        } else {
            console.log('Please enter your installation instructions!');
            return false;
        }
    }
}, {
    type: 'input',
    name: 'usage',
    message: 'How will someone use this application? (Required)',
    validate: howInput => {
        if (howInput) {
            return true;
        } else {
            console.log('Please enter what your project is!');
            return false;
        }
    }
}, {
    type: 'input',
    name: 'test',
    message: 'Please provide instructions on how to test the app. (Required)',
    validate: testInput => {
        if (testInput) {
            return true;
        } else {
            console.log('Please enter your use test instructions!');
            return false;
        }
    }
}, {
    type: 'confirm',
    name: 'confirmContributors',
    message: 'Would you like to allow other developers to contribute?',
    default: true
},
{
    type: 'input',
    name: 'contribute',
    message: 'Please provide guidelines for contributing. (Required)',
    when: ({ confirmContributors }) => {
        if (confirmContributors) {
            return true;
        } else {
            return false;
        }
    },
    validate: contributorInput => {
        if (contributorInput) {
            return true;
        } else {
            console.log('Please enter contributor guidelines!');
            return false;
        }
    }
}];

// TODO: Create a function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./gen/generated-README.MD', fileContent, err => {
            if (err) {
                reject(err)
                return
            }
            resolve({
                ok: true,
                message: 'File Created!'
            })
        })
    })
}
// Function to store user inputs and prompt questions 
const init = () => {

    return inquirer.prompt(questions)
        .then(readmeData => {
            return readmeData
        })
}
// Function call to initialize app
init()
    .then(readmeData => {
        console.log(readmeData)
        return generateMarkdown(readmeData)
    })
    .then(pageMD => {
        return writeFile(pageMD)
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse.message)
    })
    .catch(err => {
        console.log(err);
    })
