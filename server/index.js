const errors = require('./indexError');
const pg = require('pg');
const express = require('express');
const app = express();

const db = new pg.Pool({
  connectionString: 'postgres://dev:lfz@localhost/studentGradeTable'
});
app.use(express.json());

app.get('/api/grades/', (req, res) => {
  const sql = `
  select *
    from "grades"
    `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      errors(500, null, res);
    });
});

app.post('/api/grades', (req, res) => {
  if (!req.body.name || !req.body.course || !req.body.grade) {
    errors(400, null, res);
  } else {
    const sql = `
  insert into "grades" ("name", "course", "grade")
  values ($1, $2, $3)
  returning *
  `;
    const params = [req.body.name, req.body.course, req.body.grade];
    db.query(sql, params)
      .then(result => {
        res.status(201).json(result.rows[0]);
      })
      .catch(err => {
        console.error(err);
        errors(500, null, res);
      });
  }
});

app.put('/api/grades/:gradeId', (req, res) => {
  const parsedId = parseInt(req.params.gradeId);
  if (!req.body.name || !req.body.course || !req.body.grade) {
    errors(400, null, res);
  } else if (isNaN(parsedId) || parsedId < 0) {
    errors(404, req.params.gradeId, res);
  }
  const sql = `
  update "grades"
  set  "name" = $1,
       "course" = $2,
       "grade" = $3
  where "gradeId" = $4
  returning *
  `;
  const params = [req.body.name, req.body.course, req.body.grade, req.params.gradeId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      errors(500, null, res);
    });
});

app.delete('/api/grades/:gradeId', (req, res) => {
  const parsedId = parseInt(req.params.gradeId);
  if (isNaN(parsedId) || parsedId < 0) {
    errors(400, req.params.gradeId, res);
  } else {
    const sql = `
  Delete From "grades"
  where "gradeId" = $1
  `;
    const params = [req.params.gradeId];
    db.query(sql, params)
      .then(result => {
        if (result.rowCount === 1) {
          res.status(204).json();
        } else {
          errors(404, parsedId, res);
        }
      })
      .catch(err => {
        console.error(err);
        errors(500, null, res);
      });
  }
});

app.listen(3001, () =>
  // eslint-disable-next-line no-console
  console.log('We are listening')
);
