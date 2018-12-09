const {mongoose} = require('./db/mongooseDB');
const {Todo} = require('./models/todo');
const {user} = require('./models/userData');
const {authenticateUser} = require('./middleware/authenticate');

const express = require('express');// Widely used for creating the routes
const body_parser = require('body-parser'); // To parse the request of the body
const {ObjectID} = require('mongodb'); // Mostly useful for validating the object IDS
const _ = require('lodash'); // Commonly used library for common UTILS functions check it on npm libararies page for all the functions
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
// USer Routes
// SignUp New USer Routes
app.post('/signup', (req, res) => {
  let userData = _.pick(req.body, ['email','password']);
  let newUser = new user(userData);
  newUser.save().then(() => {
    return newUser.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(newUser);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/user', authenticateUser, (req, res) => {
  res.send(req.user);
});

app.post('/login', (req, res) => {
  let userData = _.pick(req.body, ['email','password']);

  user.findByCredentials(userData.email, userData.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);  
    })
  }).catch((err) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at ${port}`);
});

module.exports = {app};