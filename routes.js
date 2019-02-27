const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const events = [
  {
    "id": 8721,
    "title": "Switch Tango Series & Practica",
    "start_time": "2019-03-05 20:00:00",
    "venue_name": "Studio Valencia",
    "venue_address": "455A Valencia Street"
  },
  {
    "id": 5779,
    "title": "Cellspace Tango: Weekly DJ'd Wednesdays",
    "start_time": "2019-03-06 20:10:00",
    "venue_name": "SOMArts Cultural Center",
    "venue_address": "934 Brannan Street"
  },
  {
    "id": 7296,
    "title": "Wedding Dance Basics",
    "start_time": "2019-03-03 11:00:00",
    "venue_name": "Alma del Tango Studio",
    "venue_address": "167 Tunstead Avenue"
  },
  {
    "id": 9412,
    "title": "Argentine Tango",
    "start_time": "2019-01-10 00:00:00",
    "venue_name": "Pacifica Parks, Beaches, and Recreation",
    "venue_address": "1810 Francisco Boulevard"
  },
  {
    "id": 1456,
    "title": "Tango and Night Club 2 Step",
    "start_time": "2019-01-09 00:00:00",
    "venue_name": "Pacifica Parks, Beaches, and Recreation",
    "venue_address": "1810 Francisco Boulevard"
  }
];

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Eventonica!'
  });
});

app.get('/events', (req, res) => {
  res.status(200).json(events);
});

app.get('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  events.forEach(event => {
    if(event.id === id) {
      res.status(200).json(event);
    }
  });
});

app.post('/events', (req, res) => {
  const newEvent = {
    id: req.body.id,
    title: req.body.title,
    start_time: req.body.start_time,
    venue_name: req.body.venue_name,
    venue_address: req.body.venue_address
  }
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.put('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  events.forEach(event => {
    if(event.id === id) {
      event.title = req.body.title;
      event.start_time = req.body.start_time;
      event.venue_name = req.body.venue_name;
      event.venue_address = req.body.venue_address;
      res.status(204).end();
    }
  });
});

app.delete('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(event => event.id === id);
  events.slice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Eventonica is up and running...');
});