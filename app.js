const inquirer = require('inquirer');
//connection available to all
const connection = require('./connection');
const eventful = require('./eventfulAPI');
const fetch = require('node-fetch');

const app = {};

app.startQuestion = (closeConnectionCallback) => {
  inquirer.prompt({
    type: 'list',
    message: 'What action would you like to do?',
    choices: [
      'Complete a sentence',
      // 'Create a new user',
      'Find an event through Eventful',
      'See all events in our database',
      'Find an event by Id',
      'Create an event ',
      'Update an event',
      'Delete an event',
      // 'Mark an existing user to attend an event in database',
      // 'See all events that a particular user is going to',
      // 'See all the users that are going to a particular event',
      'Exit'
    ],
    name:'action',
  }).then((res) => {
    const continueCallback = () => app.startQuestion(closeConnectionCallback);

    if (res.action === 'Complete a sentence') app.completeSentence(continueCallback);
    // if (res.action === 'Create a new user') app.createNewUser(continueCallback);
    if (res.action === 'Find an event through Eventful') app.searchEventful(continueCallback);
    if (res.action === 'See all events') app.findAllEvents(continueCallback);
    if (res.action === 'Find an event by Id') app.findEventById(continueCallback);
    if (res.action === 'Create an event') app.createAnEvent(continueCallback);
    if (res.action === 'Update an event') app.updateAnEventById(continueCallback);
    if (res.action === 'Delete an event') app.deleteAnEventById(continueCallback);
    // if (res.action === 'Mark an existing user to attend an event in database') app.matchUserWithEvent(continueCallback);
    // if (res.action === 'See all events that a particular user is going to') app.seeEventsOfOneUser(continueCallback);
    // if (res.action === 'See all the users that are going to a particular event') app.seeUsersOfOneEvent(continueCallback);
    if (res.action === 'Exit') {
      closeConnectionCallback();
      return;
    }
  })
}

app.findAllEvents = () => {
  fetch('http://localhost:3000/events')
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
}

app.findEventById = () => {
  inquirer.prompt({
    type: 'input',
    name: 'id',
    message: 'Which event are you looking for? Please enter event ID.'
  }).then(answers => {
    fetch(`http://localhost:3000/events/${id}`)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
  }).catch(err => console.error(err));
}

app.createAnEvent = () => {
  const questions = [
    { type: 'input',
      name: 'title',
      message: 'What is the title of your event?'
    },
    {
      type: 'input',
      name: 'start_time',
      message: 'What day and time does it start? Please enter in this format "2019-01-09T08:00:00.000Z"'
    },
    {
      type: 'input',
      name: 'venue_name',
      message: 'When is the name of the venue?'
    },
    {
      type: 'input',
      name: 'venue_address',
      message: 'What is the address of your venue?'
    }
  ];

  inquirer.prompt(questions)
  .then(answers => {
    const body = {
      title: answers.title,
      start_time: answers.start_time,
      venue_name: answers.venue_name,
      venue_address: answers.venue_address
    }

    fetch('http://localhost:3000/events', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
  }).catch(err => console.error(err));
}

app.updateAnEventById = () => {
  const questions = [
    { type: 'input',
      name: 'id',
      message: 'Which event do you want to update? Please enter the event ID.'
    },
    { type: 'input',
      name: 'title',
      message: 'What is the new title of your event?'
    },
    {
      type: 'input',
      name: 'start_time',
      message: 'What is the new day and start time? Please enter in this format "2019-01-09T08:00:00.000Z"'
    },
    {
      type: 'input',
      name: 'venue_name',
      message: 'What is the new name of the venue?'
    },
    {
      type: 'input',
      name: 'venue_address',
      message: 'What is the new address of your venue?'
    }];

    inquirer.prompt(questions)
    .then(answers => {
      const body = {
        title: answers.title,
        start_time: answers.start_time,
        venue_name: answers.venue_name,
        venue_address: answers.venue_address
      }

      fetch(`http://localhost:3000/events/${answers.id}`, {
      method: 'put',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));

    }).catch(err => console.error(err));
}

app.deleteAnEventById = () => {
  inquirer.prompt({
    type: 'input',
    name: 'id',
    message: 'Which event do you want to delete? Please enter event ID.'
  }).then(answers => {
    const id = parseInt(answers.id);
    fetch(`http://localhost:3000/events/${id}`, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));

  }).catch(err => console.error(err));
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



app.searchEventful = () => {
  const questions = [
    { type: 'input',
      name: 'keyword',
      message: 'What kind of events are you looking for?'
    },
    {
      type: 'input',
      name: 'location',
      message: 'In which city?'
    },
    {
      type: 'input',
      name: 'date',
      message: 'When? Search by Month or enter "Today", "Last Week", "This Week", "Next week"'
    }
  ];

  inquirer.prompt(questions)
  .then(answers => {
    eventful.search({
      keywords: answers.keyword,
      location: answers.location,
      date: answers.date,
      sort_order: 'date',
      sort_direction: 'descending'
    });
  }).catch(err => console.error(err));
  
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


module.exports = app;
