const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000; // we can change our port
const bodyParser = require('body-parser');
// create a new MySQL connection

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const connection = mysql.createConnection({ //change this based on your mysql db location
  host: 'localhost',
  user: 'root',
  password: '411gangy',
  database: 'db'
});
// connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
    connection.query("SELECT * FROM Restaurant;", function(err, rows, fields) { //just making sure it works (yes it does)
      if(err!=null) {
        console.error('error connecting: ' + err.stack);
      } else {
        console.log(rows[0]);
      }
    })
  }
});

app.get('/api', function (req, res) {
  res.json({"data":"emily"});
});

app.post('/api/user_profile', (req, res) => {
    const { name, email, gender, genderPref } = req.body;
  
  /*const sql = 'INSERT INTO table1 (name, email, gender, genderpref) VALUES (?, ?, ?, ?)'; //need to fix this - ignore
  connection.query(sql, [name, email, gender, genderPref], (err, result) => {
      if (err) {
        console.error(err);
        console.log("sql related error..");
        res.status(500).send('Error saving data');
      } else {
        console.error("works woo!");
        res.status(201).send('Data saved successfully');
      }
    });*/
    console.log(name+" "+email+" "+gender+" "+genderPref);
  });
  
app.listen(port, () => {
  console.log('Server is running on port 3000');
});

// close the MySQL connection
//connection.end();

// from here: https://medium.com/@Rinki.EduGaon/connect-frontend-to-backend-b2c56bec8484 