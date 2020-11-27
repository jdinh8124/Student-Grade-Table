require('dotenv/config');
const errors = require('./indexError');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const bcrypt = require('bcrypt');
const app = express();

const db = require('./database');

app.use(express.json());
app.use(staticMiddleware);
app.use(sessionMiddleware);

app.get('/api/grades', (req, res) => {
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

app.post('/api/auth/signup', (req, res, next) => {
  bcrypt.hash(req.body.userPwd, 10, function (err, hash) {
    console.error(err);
    const sql = `
    insert into "user"("userName", "email", "userPwd")
    values ($1, $2, $3)
    returning "userName";
    `;

    const userValues = [req.body.userName, req.body.email, hash];
    db.query(sql, userValues)
      .then(result => res.status(201).json(result.rows[0]))
      .catch(err => {
        if (err.code === '23505') {
          res.status(400).json('Username exists');
        } next(err)
        ;
      }
      );
  });
});

app.post('/api/auth/login', (req, res, next) => {
  const userSql = `
    select "userPwd"
      from "user"
     where "userName" = $1;
    `;
  const getUserIdSql = `
    select "userId"
      from "user"
     where "userName" = $1;
  `;
  const userValues = [req.body.userName];
  db.query(userSql, userValues)
    .then(result => {
      bcrypt.compare(req.body.userPwd, result.rows[0].userPwd, (err, comResult) => {
        console.error(err);
        if (comResult) {
          db.query(getUserIdSql, userValues)
            .then(idResult => res.status(200).json(idResult.rows[0].userId))
            .catch(err => next(err));
        } else res.status(401).json();
      });
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () =>
  // eslint-disable-next-line no-console
  console.log('We are listening', process.env.PORT)
);
