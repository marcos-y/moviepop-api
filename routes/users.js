var express = require('express');
var router = express.Router();
var app = express();

//CORS
var cors = require('cors');
app.use(cors());
app.listen( 8001, function () {
    console.log('CORS-enabled web server listening on port 8002')
});

// import mysql module
mysql = require('mysql'), 

// setup local database
{/*
  db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviepop'
})
*/}

//setup remote hostinger database
db = mysql.createPool({
  host: '185.213.81.1',
  user: 'u475078680_moviepop',
  password: 'Root12345',
  database: 'u475078680_moviepop',
  debug: false
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('users');
});

//User Login
const LogIn = (req,res) =>{
  console.log(req.body)
  const { UserName, UserPassword }  = req.body
  const values = [ UserName, UserPassword]
  const sql = `SELECT * FROM users WHERE UserName = ? AND UserPassword = ? `
  db.query(sql, values , (err, result) => {
    if (err) {
      res.status(500).send(err)
    } 
    else{
      if(result.length>0){
        res.status(200).send(result[0])
      }else{
        res.status(400).send('Usuario no existe')
      }
    } 
  })
}
router.post('/' , LogIn ) 


/* Users */
//get users list
const getUsers = (req, res, next) => {
  let sql = `SELECT * FROM users`;
  db.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.json({
          status: 200,
          data,
          message: "Users lists retrieved successfully"
      })
  })
}
router.get('/' , getUsers);

module.exports = router;
