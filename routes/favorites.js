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
//get favorite movies list
const getFavorites = (req, res, next) => {
  userId = req.params.userId
  let sql = `SELECT * FROM favorites WHERE userId = ? `;
  db.query(sql , [userId], (err, results) => {
    res.json(results)
})
}
router.get('/:userId' , getFavorites);

/* GET favorites listing. */
{/*
router.get('/', function(req, res, next) {
  res.json('favorites');
});
*/}

module.exports = router;
