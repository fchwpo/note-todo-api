const {mongoose} = require('./db/mongooseDB');
const {Todo} = require('./models/todo');
const {UserCollection} = require('./models/userData');

const express = require('express');
const body_parser = require('body-parser');
const {ObjectID} = require('mongodb');

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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }).catch((err) => {
    res.status(400).send(e);
  });
})

app.get('/todos/:id', (req, res) => {
  var _id = req.params.id;
  if(ObjectID.isValid(_id)){
    Todo.findById(_id).then((todo) => {
      todo && res.send(todo);
      !todo && res.status(404).send({});
    }).catch((err) => {
      res.status(400).send(err);
    });
  } else {
    res.status(404).send({});
  }
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};