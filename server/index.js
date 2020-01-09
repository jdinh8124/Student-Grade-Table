// const path = require('path');
// const jsonServer = require('json-server');
const express = require('express');
const data = require('../database/data.json');
const fs = require('fs');
const app = express();
app.use(express.json());

// var router = express.Router();
// const dbPath = path.resolve(__dirname, '../database/data.json');
// const filePath = express.static(path.join(__dirname, '/public'));
// // const server = jsonServer.create();
// const middleware = jsonServer.defaults();
// const endpoints = jsonServer.router(dbPath);
// app.use('/api', endpoints);
// server.use(middleware);
// server.use('/api', endpoints);
// server.listen(3001, () => {
//   // eslint-disable-next-line no-console
//   console.log('JSON Server listening on port 3001\n');
// });

app.get('/api/grades/', (req, res) => {
  const grades = data.grades;
  res.status(200).json(grades);
});

app.post('/api/grades/', (req, res) => {
  if (!req.body) {
    const errorObjectNoBody = { error: 'There was no content to POST' };
    res.status(400).json(errorObjectNoBody);
  } else {
    const objToPush = {
      name: req.body.name,
      course: req.body.course,
      grade: req.body.grade,
      id: data.nextId
    };
    data.grades.push(objToPush);
    const jsonSend = JSON.stringify(data, null, 2);
    data.nextId++;
    fs.writeFile('../database/data.json', jsonSend, 'utf-8', function (err) {
      if (err) {
        const genericError = { error: 'An unexpected error occurred.' };
        res.status(500).json(genericError);
      } else {
        res.status(201).json(objToPush);

      }
    });
  }
});

app.delete('/api/grades/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId) || parsedId < 0) {
    const errorObject = { error: 'ID must be a positive integer' };
    res.status(400).json(errorObject);
  } else {
    const found = data.grades.findIndex(element => element.id === parsedId);
    if (found >= 0) {
      data.grades.splice(found, 1);
      const jsonSend = JSON.stringify(data, null, 2);
      fs.writeFile('../database/data.json', jsonSend, 'utf-8', function (err) {
        if (err) {
          const genericError = { error: 'An unexpected error occurred.' };
          res.status(500).json(genericError);
        } else {
          res.status(204).json();
        }
      });
    } else {
      const notFound = { error: `ID ${parsedId} does not exsist` };
      res.status(404).json(notFound);
    }
  }
});

app.put('/api/grades/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (!req.body) {
    const errorObjectNoBody = { error: 'There was no content to PUT' };
    res.status(400).json(errorObjectNoBody);
  } else if (isNaN(parsedId) || parsedId < 0) {
    const errorObject = { error: 'ID must be a positive integer' };
    res.status(400).json(errorObject);
  } else {
    const foundIndex = data.grades.findIndex(element => element.id === parsedId);
    if (foundIndex >= 0) {
      const objToPush = {
        name: req.body.name,
        course: req.body.course,
        grade: req.body.grade,
        id: parsedId
      };
      data.grades[foundIndex] = objToPush;
      const jsonSend = JSON.stringify(data, null, 2);
      fs.writeFile('../database/data.json', jsonSend, 'utf-8', function (err) {
        if (err) {
          const genericError = { error: 'An unexpected error occurred.' };
          res.status(500).json(genericError);
        } else {
          res.status(201).json(objToPush);
        }
      });
    } else {
      const notFound = { error: `ID ${parsedId} does not exsist` };
      res.status(404).json(notFound);
    }
  }
});
app.listen(3000, () =>
// eslint-disable-next-line no-console
  console.log('We are always listening!')
);
