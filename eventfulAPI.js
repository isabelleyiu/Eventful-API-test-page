const eventfulKey = require("./keys.js").eventful;
const eventful = require('eventful-node');
const client = new eventful.Client(eventfulKey);
const fetch = require('node-fetch');

const saveEvent = (event) => {
  const body = {
    title: event.title,
    start_time: event.start_time,
    venue_name: event.venue_name,
    venue_address: event.venue_address
  }

  fetch('http://localhost:3000/events', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
}

//export a custom function that searches via Eventful API, displays the results AND stores some of the data into MySQL
const search = function(optionsObj){
  client.searchEvents(optionsObj, function(err, data){
     if(err){
       return console.error(err);
     }
     let resultEvents = data.search.events.event;
     console.log('Received ' + data.search.total_items + ' events');
     console.log('Event listings: ');

     // saving the first result into our database
     saveEvent(resultEvents[0]);

     for ( let i =0 ; i < resultEvents.length; i++){
       console.log("===========================================================")
       console.log('title: ',resultEvents[i].title);
       console.log('start_time: ',resultEvents[i].start_time);
       console.log('venue_name: ',resultEvents[i].venue_name);
       console.log('venue_address: ',resultEvents[i].venue_address);
     }
  }); 
}



module.exports = {
  search,
  saveEvent
}