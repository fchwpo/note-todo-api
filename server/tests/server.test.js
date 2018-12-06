const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var dummyTodos = [{
  text: "Hello"
},{
  text: "Shubham"
}];
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(dummyTodos);
  }).then(() => done());
});

describe(' POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test Todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  });
  it('Should not create Todo', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .expect((res) => {
        // expect(res).toBe(Error);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }

        Todo.find().then((data) => {
          expect(data.length).toBe(2);
          done();
        }).catch((e) => done(e));

      })

  });
});

describe(' GET /todos', () => {
  it('should get all teh data', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});