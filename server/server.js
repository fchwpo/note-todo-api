const {mongoose} = require('./db/mongooseDB');
const {Todo} = require('./models/todo');
const {UserCollection} = require('./models/userData');

const express = require('express');
const body_parser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const app = express();
const port = process.env.PORT || 3000;

app.use(body_parser.json());
// Request to add todo
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
// Request to retrive todo
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }).catch((err) => {
    res.status(400).send(e);
  });
})
// Request to retrive todo by id
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
// Request to delete todo by id
app.delete('/todos/:id', (req, res) => {
  var _id = req.params.id;
  if(ObjectID.isValid(_id)){
    Todo.findByIdAndRemove(_id).then((todo) => {
      todo && res.send(todo);
      !todo && res.status(404).send({error:`Unable to find TODO By ID ${_id}`});
    }).catch((err) => {
      res.status(404).send();
    });
  } else {
    res.status(400).send({error:"Invalid Request"});
  }
});
// REquest to update
app.patch('/todos/:id',(req, res) => {
  const _id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(_id)){
    return res.status(400).send('Invalid ID');
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
    body.completed = true;
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(_id, {
    $set: body
  }, {new: true}).then((todo) => {
    todo && res.send({todo});
    !todo && res.status(404).send();
  }).catch((err) => {
    res.status(404).send();
  });
});
app.listen(port, () => {
  console.log(`Started up at ${port}`);
});

module.exports = {app};