require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: 5432
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Eventonica!'
  });
});

app.get('/events', (req, res) => {
  pool.query('SELECT * FROM events', (err, results) => {
    if(err) {
      res.status(404).json({message: 'There are no events yet...'});
    } else {
      res.status(200).json(results.rows);
    }
  });
});

app.get('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  pool.query('SELECT * FROM events WHERE id = $1', [id], (err, results) => {
    if(err) {
      res.status(404).json({message: 'Event Not Found...'});
    } else {
      res.status(200).json(results.rows);
    }
  });
});

app.post('/events', (req, res) => {
  const { title, start_time, venue_name, venue_address } = req.body;

  pool.query('INSERT INTO events (title, start_time, venue_name, venue_address) VALUES ($1, $2, $3, $4)', [title, start_time, venue_name, venue_address],
  (err, results) => {
    if(err) {
      res.status(400).json({message: 'Please enter all 5 inputs: id, title, start_time, venue_name, venue_address'});
    } else {
      res.status(201).json({message: 'Your event is successfully created'});
    }
  });
});

app.put('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, start_time, venue_name, venue_address } = req.body;

  pool.query('UPDATE events SET title = $1, start_time = $2, venue_name = $3, venue_address = $4 WHERE id = $5', [title, start_time, venue_name, venue_address, id], (err, results) => {
    if(err) {
      res.status(404).json({message: 'Event Not Found...'});
    } else {
      res.status(204).end();
    }
  });
});

app.delete('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM events WHERE id = $1', [id], (err, results) => {
    if(err) {
      res.status(404).json({message: 'Event Not Found...'});
    } else {
      res.status(204).end();
    }
  });
});

app.listen(PORT, () => {
  console.log('Eventonica is up and running...');
});