const inquirer = require('inquirer');
//connection available to all
const connection = require('./connection');

const app = {};

app.startQuestion = (closeConnectionCallback) => {
  inquirer.prompt({
    type: 'list',
    message: 'What action would you like to do?',
    choices: [
      'Complete a sentence',
      'Create a new user',
      'Find one event of a particular type in San Francisco next week',
      'Mark an existing user to attend an event in database',
      'See all events that a particular user is going to',
      'See all the users that are going to a particular event',
      'Exit'
    ],
    name:'action',
  }).then((res) => {
    const continueCallback = () => app.startQuestion(closeConnectionCallback);

    if (res.action === 'Complete a sentence') app.completeSentence(continueCallback);
    if (res.action === 'Create a new user') app.createNewUser(continueCallback);
    if (res.action === 'Find one event of a particular type in San Francisco next week') app.searchEventful(continueCallback);
    if (res.action === 'Mark an existing user to attend an event in database') app.matchUserWithEvent(continueCallback);
    if (res.action === 'See all events that a particular user is going to') app.seeEventsOfOneUser(continueCallback);
    if (res.action === 'See all the users that are going to a particular event') app.seeUsersOfOneEvent(continueCallback);
    if (res.action === 'Exit') {
      closeConnectionCallback();
      return;
    }
  })
}

app.completeSentence = () => {
  const questions = [
    { type: 'confirm',
      name: 'confirm',
      message: '===== Welcome to the Crystal Ball ======\n I can tell you about your past and your future...',
      default: true
    },
    {
      type: 'input',
      name: 'string1',
      message: 'What is your first word of choice?'
    },
    {
      type: 'input',
      name: 'string2',
      message: 'What is your second word of choice?'
    }
  ];

  inquirer.prompt(questions)
  .then(function(answers) {
    // if(answers.confirm) {
    //   console.log('Your quest will start now...');
    // } else {
    //   console.log(`Sorry to hear that...Come back when you want to find out about yourself.`);
    // }
    console.log(`In your previous life, you're a ${answers.string1}. In your next life you will be a ${answers.string2}`);
  });
  // continueCallback();
}

app.createNewUser = (continueCallback) => {
  //YOUR WORK HERE

  console.log('Please write code for this function');
  //End of your work
  continueCallback();

}

app.searchEventful = (continueCallback) => {
  //YOUR WORK HERE

  console.log('Please write code for this function');
  //End of your work
  continueCallback();
}

app.matchUserWithEvent = (continueCallback) => {
  //YOUR WORK HERE

  console.log('Please write code for this function');
  //End of your work
  continueCallback();
}

app.seeEventsOfOneUser = (continueCallback) => {
  //YOUR WORK HERE

  console.log('Please write code for this function');
  //End of your work
  continueCallback();
}

app.seeUsersOfOneEvent = (continueCallback) => {
  //YOUR WORK HERE

  console.log('Please write code for this function');
  //End of your work
  continueCallback();
}

app.startQuestion();

module.exports = app;
