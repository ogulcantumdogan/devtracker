const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../../config');
const validator = require('validator');
const bcrypt = require('bcrypt');


//SQL Connection
const connection = mysql.createConnection(config.dbLoginInfo);

//  users GET request
router.get('/', (req,res) => {

  connection.query("SELECT * FROM users WHERE deleted_at IS NULL", (err, result) => {
    if (err) throw err;
    console.log("/users GET request alındı.")

    const users = result.map((row) => {
      return {
        firstName: row.first_name,
        lastName: row.last_name,
        eMail: row.email,
        id: row.id,
      }
    });

      res.status(200).json({
      error: false,
      message: 'Users GET başarılı!',
      result: users,
      errorCode: 0
    })
  })
});

// users POST request
router.post('/', (req,res) => {

  var isPassword= validator.isLength(req.body.password,8,128);
  var isEmail = validator.isEmail(req.body.eMail);
  var message = "";

  if(!isPassword) message += "parola min 8 karakter olmalı. ";
  if(!isEmail) message += "eMail geçersiz ";

  if(!isPassword || !isEmail ){
    console.log(message);

    res.status(422).json({
      error: true,
      message: message,
    })
}


  else if(isEmail && isPassword){

    const hashedpw = bcrypt.hashSync(req.body.password, 0).toString();
    console.log(hashedpw.toString());

    const queryString = "INSERT INTO users (first_name, last_name, email, password) VALUES " +
    `(
    "${req.body.firstName}",
    "${req.body.lastName}",
    "${req.body.eMail}",
    "${hashedpw}"
    )`

 // bcyrpt
  connection.query(queryString, (err,result) =>{
    if (err) throw err;
    else{
      console.log( 'yeni row users\'a girildi. row id: ' + result.insertId);
      res.status(201).json({
        error: false,
        message: 'Yeni user POST! girilen user id: ' + result.insertId,
        result: req.body,
        errorCode: 0
      })
    }
  })
}
});

// users/id GET request
router.get('/:id', (req,res) => {

  const userId = req.params.id;

  const queryString = "SELECT * FROM users WHERE id= " + userId + " AND deleted_at IS NULL";

  connection.query(queryString, (err,result,fields) =>{
    if(err) throw err;
    console.log("users/id GET request geldi. id: " + userId)
    console.log(result);

  const user = result.map((row) => {
    return {
      firstName: row.first_name,
      lastName: row.last_name,
      eMail: row.email,
      id: row.id,
    }
  });

   if(result.length){
      res.status(200).json({
      error: false,
      message: 'User geldi',
      result: user[0],
      errorCode: 0
      })
    } else {
      res.status(404).json();
    }
  })
});

// users/id DELETE request
router.delete('/:id', (req,res) => {

  const userId = req.params.id;
  const queryString = "UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = " + userId;

  connection.query(queryString, (err,result) => {
    if (err) throw err;

    console.log(" users/id Delete request alındı. id: " + userId)

    if (result.affectedRows == 0 ){
      console.log("user id bulunamadı!");
      res.status(404).json({
      error: true,
      message: 'User id bulunamadı! silmeye çalıştığın id: ' + userId,
      result: result,
      errorcode:0
      })}

    else if (result.affectedRows == 1){
      console.log("user silindi!")
      res.status(204).json();
    }
  })
});

//users/id PUT request (updater)
router.put('/:id', (req,res) => {

  // // var isPassword= validator.isLength(req.body.password,8,128);
  // var isEmail = validator.isEmail(req.body.eMail);
  // var message = "";

  // // if(!isPassword) message += "parola min 8 karakter olmalı. ";
  // if(!isEmail) message += "eMail geçersiz ";

  // if(!isPassword || !isEmail ){
  //   console.log(message);

  //   res.status(422).json({
  //     error: true,
  //     message: message,
  //   })
  // }

  // else if(isEmail && isPassword){
    const userId = req.params.id;
    const queryString = "UPDATE users SET first_name = ?, last_name = ?, email= ? WHERE id= ? AND deleted_at IS NULL";
    connection.query(queryString, [req.body.firstName, req.body.lastName, req.body.eMail, userId], (err,result) => {
      if (err) throw err;
        console.log('UPDATE request geldi, user id: ' + userId)
      if(!result.affectedRows){
        console.log('editlenecek user bulunamadı!')
        res.status(404).json()
      }

      else{
        console.log('başarıyla güncellendi!')
        res.status(200).json({
          error: false,
          message: 'User id: ' + userId + ' başarıyla güncellendi.',
          result: req.body,
          errorcode:0
          })
        }
      })
    // }
})

module.exports = router;

