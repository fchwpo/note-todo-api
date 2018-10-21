const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (error, db) => {
  if(error){
    console.log('Unable to connect to MongoDB Server');
    return;
  }
  console.log('Connected to MongoDB Server');
  db.collection('Todos').find({completed: true}).toArray().then((docs) => {
    console.log('To dos');
    console.log(JSON.stringify(docs, undefined, 3));
  }).catch((err) => {
    console.log('Unable to fetch todos');
  });
  db.collection('Todos').find({completed: true}).count().then((count) => {
    console.log(`To dos count ${count}`);
  }).catch((err) => {
    console.log('Unable to fetch todos');
  });
  db.collection('Todos').find({_id: new ObjectID('5bcc98a2e903ed2ad4ac39c0')}).toArray().then((docs) => {
    console.log('To dos');
    console.log(JSON.stringify(docs, undefined, 3));
  }).catch((err) => {
    console.log('Unable to fetch todos');
  });
  db.collection('Users').find({name: 'Shubham Vishwakarma'}).toArray().then((docs) => {
    console.log('Users with name Shubham Vishwakarma');
    console.log(docs);
  }).catch((err) => {
    console.log('Unable to fetch Users');
  });
  db.collection('Users').find({name: 'Shubham Vishwakarma'}).count().then((count) => {
    console.log('Users with name Shubham Vishwakarma');
    console.log(count);
  }).catch((err) => {
    console.log('Unable to fetch Users');
  });
  // db.close();
});