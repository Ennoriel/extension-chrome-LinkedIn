
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

var mysql = require('mysql');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/:firstName/:lastName', function (req, res) {
  console.log(req.params.firstName + " " + req.params.lastName);
  const requete = 'REQUETE SQL';
  
  var connection = mysql.createConnection({
    host     : 'host',
    user     : 'user',
    password : 'pwd',
    database : 'db'
  });

    connection.query(requete, [], function(err, rows, fields) {
      if(rows) {
        res.send(rows)
      } else {
        res.status(500).send('Something broke!');
      }
    });
    connection.end();
})

app.listen(3042, function () {})
