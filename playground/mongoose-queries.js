const {mongooseDB} = require('./../server/db/mongooseDB');
const {Todo} = require('./../server/models/todo');

const id = '5c099547a5324d2984286075';

Todo.find({
  _id: id
}).then((data) => {
  console.log('Data 1', data);
})

Todo.findOne({
  _id: id
}).then((data) => {
  console.log('Data 2', data);
})

Todo.findById(id).then((result) => {
  console.log('Data 3', result);
});