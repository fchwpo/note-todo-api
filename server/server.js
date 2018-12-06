const {mongoose} = require('./db/mongooseDB');
const {Todo} = require('./models/todo');
const {UserCollection} = require('./models/userData');

const express = require('express');
const body_parser = require('body-parser');

const app = express();

app.use(body_parser.json());

app.post('/todos', (requset, response) => {
  var newToDo = new Todo({
    text: requset.body.text
  });
  newToDo.save().then((doc) => {
    response.send(doc);
  }).catch((err) => {
    response.status(400).send(err);
  });
  console.log(requset.body);
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};