const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000; // we can change our port
const bodyParser = require('body-parser');
// create a new MySQL connection
var count = -1;
var currentUser = {"userId": -1}
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const connection = mysql.createConnection({ //change this based on your mysql db location
  host: 'localhost',
  user: 'root',
  password: '411gangy',
  database: 'sys'
});
// connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
    connection.query("SELECT count(*) FROM User;", function(err, rows, fields) { //just making sure it works (yes it does)
      if(err!=null) {
        console.error('error connecting: ' + err.stack);
      } else {
        count = (rows[0]['count(*)']);
      }
    })
  }
});

app.get('/api', function (req, res) {
  res.json(currentUser);
  console.log(currentUser.userId);
});

app.post('/api/user_profile', (req, res) => {
    const { fname, lname, email, pass, gender, genderPref, cuisinePref, maxBudget, allergies, datelen } = req.body;
  let userid = count+1;
  count+=1;
  currentUser = {"userId": userid, "email": email, "pass": pass, "fname": fname, "lname":lname, "gender":gender, "genderPref":genderPref, "cuisinePref":cuisinePref, "maxBudget":maxBudget, "dateTime":datelen, "allergies":allergies};
  const sql = 'INSERT INTO User VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; //need to fix this - ignore
  connection.query(sql, [userid, email, pass, fname, lname, gender, genderPref, cuisinePref, maxBudget, datelen, allergies], (err, result) => {
      if (err) {
        console.error(err);
        console.log("sql related error..");
        res.status(500).send('Error saving data');
      } else {
        console.error("works woo!");
        res.status(201).send('Data saved successfully');
      }
    });
    console.log(fname+"\n"+lname+"\n"+email+"\n"+pass+"\n"+gender+"\n"+genderPref+"\n"+cuisinePref+"\n"+maxBudget+"\n"+allergies+"\n"+datelen );

    // get (user) match
    // [cuisine_pref, max_budget, optimal_len_date, cuisine_pref, max_budget, optimal_len_date, gender_identity, gender_pref, userid]
    const user_match_sql = match_person();
    connection.query(user_match_sql, [cuisinePref, maxBudget, datelen, cuisinePref, maxBudget, datelen, gender, genderPref, userid], (err, rows, fields) => {
      if (err) {
        console.error(err);
        console.log("sql related error..");
        res.status(500).send('Error saving data');
      } else {
        console.log("found match!");
      }
    });

  });
  
app.listen(port, () => {
  console.log('Server is running on port 3001');
});

// close the MySQL connection
//connection.end();

// from here: https://medium.com/@Rinki.EduGaon/connect-frontend-to-backend-b2c56bec8484 