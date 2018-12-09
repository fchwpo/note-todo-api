const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '1234567san';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hashedValue) => {
//     console.log(hashedValue);
//   });
// });


var hashedPassword = '$2a$10$XVfIecKensjnug9/7z85lObMPKGm43clzXW2Uh9uUFr4U7eyARhyi';

bcrypt.compare(password, hashedPassword, (err, res)=> {
  console.log(res);
});
// let a = {
//   id: 10
// };

// var token = jwt.sign(a, '123abc');
// // jwt.verify
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// let msg = "I am user no 1";
// let hashedMsg = SHA256(msg).toString();

// console.log(msg);
// console.log(hashedMsg);

// var data = {
//   id: 4
// };
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'salt-key').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'salt-key').toString();

// if(resultHash === token.hash){
//   console.log('Data was not changed');
// } else {
//   console.log('Data was manipulated, Don\'t trudt them');
// }

// This concept of craeting an object i,e token and verify afterwards is called Jason Web Tokens