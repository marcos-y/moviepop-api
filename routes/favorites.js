var express = require('express');
var router = express.Router();
var app = express();

//CORS
var cors = require('cors');
app.use(cors());
app.listen( 8003, function () {
    console.log('CORS-enabled web server listening on port 8003')
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


/* Users */
//get favorite movies list
const getFavorites = (req, res, next) => {
  userId = req.params.userId
  let sql = `SELECT * FROM favorites WHERE userId = ? `;
  db.query(sql , [userId], (err, data) => {
    if (err) throw err;
    res.json(data)
})
}
router.get('/:userId' , getFavorites);


//POST favorite movie
const postFavoriteMovie = (req, res) => {

  let sql = `INSERT INTO favorites ( userId, name, language, genres, premiered, synopsys, image, movieId ) VALUES (?)`;
  let values = [
    req.body.userId,
    req.body.name,
    req.body.language,
    req.body.genres,
    req.body.premiered,
    req.body.synopsys,
    req.body.image,
    req.body.movieId,
  ];
  console.log(values)
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New movie added successfully"
    })
  })
}
router.post('/', postFavoriteMovie);

module.exports = router;
