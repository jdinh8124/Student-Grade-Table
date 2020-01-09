const path = require('path');
// const jsonServer = require('json-server');
const express = require('express');
const data = require('../database/data.json');
const fs = require('fs');
const app = express();
const Errors = require('./indexError');

const dbPath = path.resolve(__dirname, '../database/data.json');
const filePath = express.static(path.join(__dirname, '/public'));

app.use(express.json(), filePath);

app.get('/api/grades/', (req, res) => {
  const grades = data.grades;
  res.status(200).json(grades);
});

app.post('/api/grades/', (req, res) => {
  if (!req.body.name || !req.body.course || !req.body.grade) {
    Errors(400, null, res);
  } else {
    const objToPush = {
      name: req.body.name,
      course: req.body.course,
      grade: parseInt(req.body.grade),
      id: data.nextId
    };
    data.grades.push(objToPush);
    const jsonSend = JSON.stringify(data, null, 2);
    data.nextId++;
    fs.writeFile(dbPath, jsonSend, 'utf-8', function (err) {
      if (err) {
        Errors(500, null, res);
      } else {
        res.status(201).json(objToPush);

      }
    });
  }
});

app.delete('/api/grades/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId) || parsedId < 0) {
    Errors(404, parsedId, res);
  } else {
    const found = data.grades.findIndex(element => element.id === parsedId);
    if (found >= 0) {
      data.grades.splice(found, 1);
      const jsonSend = JSON.stringify(data, null, 2);
      fs.writeFile(dbPath, jsonSend, 'utf-8', function (err) {
        if (err) {
          Errors(500, null, res);
        } else {
          res.status(204).json();
        }
      });
    } else {
      Errors(404, parsedId, res);
    }
  }
});

app.put('/api/grades/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (!req.body.name || !req.body.course || !req.body.grade) {
    Errors(400, null, res);
  } else if (isNaN(parsedId) || parsedId < 0) {
    Errors(404, parsedId, res);
  } else {
    const foundIndex = data.grades.findIndex(element => element.id === parsedId);
    if (foundIndex >= 0) {
      const objToPush = {
        name: req.body.name,
        course: req.body.course,
        grade: parseInt(req.body.grade),
        id: parsedId
      };
      data.grades[foundIndex] = objToPush;
      const jsonSend = JSON.stringify(data, null, 2);
      fs.writeFile(dbPath, jsonSend, 'utf-8', function (err) {
        if (err) {
          Errors(500, null, res);
        } else {
          res.status(201).json(objToPush);
        }
      });
    } else {
      Errors(404, parsedId, res);
    }
  }
});
app.listen(3001, () =>
// eslint-disable-next-line no-console
  console.log('We are always listening!')
);
