var express = require('express');
var router = express.Router();
var app = express();

//CORS
var cors = require('cors');
app.use(cors());
app.listen( 8002, function () {
    console.log('CORS-enabled web server listening on port 8002')
});

// import mysql module
mysql = require('mysql'), 

// setup local database
  db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviepop'
})

//setup remote hostinger database
/*
db = mysql.createPool({
  host: '185.213.81.1',
  user: 'u475078680_mystore',
  password: 'MyStore12345',
  database: 'u475078680_mystore',
  debug: false
})
*/


/* Users */
//get comments list by movieId------------------------
const getCommentsList = (req, res, next) => {
  movieId = req.params.movieId
  let sql = `SELECT * FROM comments WHERE movieId = ? `;
  db.query(sql, [movieId] , function (err, data, fields) {
      if (err) throw err;
      res.json(data)
  })
}
router.get('/:movieId' , getCommentsList);



//post comment----------------------------------------
const postComment = (req, res, next) => { 

  let sql = `INSERT INTO comments ( movieId, comment, UserName, UserId ) VALUES (?)`;
  let values = [
    req.body.movieId,
    req.body.comment,
    req.body.UserName,
    req.body.UserId,
  ];
  db.query(sql, [values] , function (err, data, fields) {
      if (err) throw err;
      res.json(data)
  })
}
router.post('/' , postComment);

/* Users */
//get comments list
{/*
const getComments = (req, res, next) => {
  let sql = `SELECT * FROM comments WHERE UserName = ? `;
  db.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.json({
          status: 200,
          data,
          message: "Users lists retrieved successfully"
      })
  })
}
router.get('/' , getComments);
*/}

module.exports = router;
