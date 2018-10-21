const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (error, db) => {
  if(error){
    console.log('Unable to connect to MongoDB Server');
    return;
  }
  console.log('Connected to MongoDB Server');
  
  //findOneAndUpdate()
  // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5bcc9888e903ed2ad4ac39bf')},{
  //   $set: {
  //     completed: false
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result); 
  // }).catch((err) => {
    
  // });
  db.collection('Users').updateMany({name: 'Sanjay'},{
    $set: {
      name: 'Shubham'
    }
  },{

  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    
  });
  db.collection('Users').findOneAndUpdate({name: 'Kaushilya'},{
    $set: {
      name: 'Navmi'
    }
  },{

  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    
  });
  db.collection('Users').updateMany({},{
    $inc: {
      age: +1
    }
  },{}).then((result) => {
    
  }).catch((err) => {
    
  });
  // db.close();
});