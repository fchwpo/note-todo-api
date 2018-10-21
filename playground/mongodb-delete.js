const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (error, db) => {
  if(error){
    console.log('Unable to connect to MongoDB Server');
    return;
  }
  console.log('Connected to MongoDB Server');
  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Buy Condom'}).then((result) => {
  //   console.log(result);
  // }).catch((err) => {
    
  // });
  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Buy shampoo'}).then((result) => {
  //   console.log(result);
  // }).catch((err) => {
    
  // });
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // }).catch((err) => {
    
  // });
  // db.collection('Users').find().toArray().then((data) => {
  //   // console.log(JSON.stringify(data, undefined, 2));
  //   data
  // }).catch((err) => {
    
  // });
  db.collection('Users').deleteMany({name: 'Shubham Vishwakarma'});
  
  // db.collection('Users').findOneAndDelete({_id: new ObjectID('5bcc944e0743541aa8b4b3ca')}).then((result) => {
  //   console.log(JSON.stringify(result, undefined, 2))
  // }).catch((err) => {
    
  // });
  // db.close();
});