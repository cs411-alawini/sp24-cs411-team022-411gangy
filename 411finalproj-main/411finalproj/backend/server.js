//const { match_person } = require('./queries.js');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3001; // we can change our port
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
  database: 'db'
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
    });
    //connection.query() - need to go through every single restaurant and then calcualte average?
    connection.query(check_unique_trigger(), [], function(err,rows,fileds) {
      if(err!=null) {
        //console.log("trigger error! "+err.stack);
      } else {
        console.log("trigger works!");
      }
    });
    connection.query(create_stored_procedure(), [], function(err,rows,fields) {
      if(err!=null) {
        //console.log("trigger error! "+err.stack);
      } else {
        console.log("trigger works!");
      }
    });
    generate_average_ratings();
  }
});

app.get('/api', function (req, res) {
  res.json(currentUser);
  console.log(currentUser.userId);
});

app.get('/api/create_match', (req, res) => {
  //create name and get best restaurant for the match
  //not sure how to return - but you want to return date, time, etc (everything)
  const {userIdA, userIdB} = req.body;
  const matchId = create_match(userIdA, userIdB); 
  const res_name = find_restaurant(userIdA, userIdB);
  
  const date = '5/1/2024'; //cam make random later on...
  const time = '1:15pm';
  return {matchId, res_name, date, time};//do you want to return restaurant information too? 
  //need ot also display best review and average rating using stored procedure - maybe run in database first and see how it works..?

});

app.get('/api/delete_match', (req, res) => {
  //delete the match id
  const {matchId} = req.body;
  delete_match(matchId);
});

app.get('/api/accept_match', (req, res) => {
  const {matchId, restaurantName, date, time} = req.body;
  accept_reservation(matchId, restaurantName, date, time);
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
    connection.query(match_person(),[cuisinePref, maxBudget, datelen, cuisinePref, maxBudget, datelen, gender, genderPref, userid, userid], (err, rows, fields) => {
      if (err) {
        console.error(err);
      } else {
        console.error("works!");
        console.log(rows); //return rows to the frontend and take it to the next page (keep as a list somehow)
      }
      
      // console.log(rows[1]['UserIdA']+"\n"+rows[1]['UserIdB']);
      // console.log(rows[2]['UserIdA']+"\n"+rows[2]['UserIdB']);
      // console.log(rows[3]['UserIdA']+"\n"+rows[3]['UserIdB']);
      // console.log(rows[4]['UserIdA']+"\n"+rows[4]['UserIdB']);
      // console.log(rows[5]['UserIdA']+"\n"+rows[5]['UserIdB']);
    });
  
  });
  //if it already doesn't exist in user:
  
  
app.listen(port, () => {
  console.log('Server is running on port 3001');
});

// close the MySQL connection
//connection.end();

// from here: https://medium.com/@Rinki.EduGaon/connect-frontend-to-backend-b2c56bec8484 

// [cuisine_pref, max_budget, optimal_len_date, cuisine_pref, max_budget, optimal_len_date, gender_identity, gender_pref, userid]
function create_match( userIdA, userIdB) { //call this when you display each match - call from frontend - mod through each - if reject, then delete match...
  //check if match exists
  let match_exists = 0;
  connection.query('SELECT COUNT(*) FROM Matches WHERE (UserIdA = ? AND UserIdB = ?) OR (UserIdA = ? AND UserIdB = ?);', [userIdA, userIdB, userIdB, userIdA], (err, result) => {
    if(err!=null) {
      console.log('error connecting create match: ');
    } else {
      if(rows[0]['COUNT(*)'] > 0) {
        match_exists = 1;
      }
    }
  }); //if both A and B have no matches - then they match
  const match_id = 0;
  connection.query("SELECT count(*) FROM Matches;", function(err, rows, fields) { //just making sure it works (yes it does)
    if(err!=null) {
      console.error('error connecting: ' + err.stack);
    } else {
      match_id = (rows[0]['count(*)'])+1;
    }
  });
  
  if(match_exists == 0) {
    connection.query('INSERT INTO Matches VALUES (?, ?, ?, ?);', [match_id, userIdA, userIdB, ''], (err, result) => {
      if(err!=null) {
        console.log('error adding into match');
      } else {
        console.log('successfully added match!');
      }
    });
  }
  return match_id; //return match_id to frontend or something
}
function delete_match( match_id) { //when they click refresh, delete the match_id - otherwise, keep it.
  connection.query('DELETE FROM Matches WHERE MatchId = ?;', [match_id], (err, result) => {
    if(err!=null) {
      console.log('error removing from match');
    } else {
      console.log('successfully removed match!');
    }
  });
}
function accept_reservation(match_id, restaurantName, date, time) { //if you keep it, call this function (accept reservation button)
  const res_id = -1;
  //actually get correct reservation id
  connection.query("SELECT count(*) FROM Reservation;", function(err, rows, fields) { //just making sure it works (yes it does)
    if(err!=null) {
      console.error('error connecting: ' + err.stack);
    } else {
      res_id = (rows[0]['count(*)'])+1;
    }
  });

  connection.query('INSERT INTO Reservation VALUES (?, ?, ?)', [res_id, restaurantName, match_id, time, date], (err, result) => {
    if(err!=null) {
      console.log("issue accepting reservation");
    }
  });
}

function find_restaurant(userIdA, userIdB) {
  const int_UA = userIdA;
  const int_UB = userIdB;
  const res_name = '';
  const UA = {max_budget: 0, Allergies: 0, CuisinePreference: 0, UserId: 0};
  const UB = {max_budget: 0, Allergies: 0, CuisinePreference: 0, UserId: 0};
  connection.query('SELECT MaximumBudget, Allergies, CuisinePreference, UserId FROM Matches WHERE UserId = ?', [int_UA], (err, rows, fields) => {
    if(err!=null) {
      console.error('error find UA: ' + err.stack);
    } else {
      UA.max_budget = rows[0]['MaximumBudget'];
      UA.Allergies = rows[0]['Allergies'];
      UA.CuisinePreference = rows[0]['CuisinePreference'];
      UA.UserId = rows[0]['UserId'];
    }
  });
  connection.query('SELECT MaximumBudget, Allergies, CuisinePreference, UserId FROM Matches WHERE UserId = ?', [int_UB], (err, rows, fields) => {
    if(err!=null) {
      console.error('error find UB: ' + err.stack);
    } else {
      UB.max_budget = rows[0]['MaximumBudget'];
      UB.Allergies = rows[0]['Allergies'];
      UB.CuisinePreference = rows[0]['CuisinePreference'];
      UB.UserId = rows[0]['UserId'];
    }
  });

  connection.query(match_to_restaurant(), [UA.max_budget, UA.max_budget, UA.Allergies, UB.Allergies, UA.CuisinePreference, UB.CuisinePreference, UA.UserId, UB.UserId], (err, result) => {
    if(err!=null) {
      console.error('error find res: ' + err.stack);
    } else {
      res_name = (rows[0]['RestaurantName']);
    }
  });
  return res_name;
  
}

function generate_average_ratings() { //this works!
  connection.query('SELECT RestaurantName FROM Restaurant;', [], (err,rows,fields)=> {
    if(err!=null) {
      //console.log("trigger error! "+err.stack);
    } else {
      for(let i = 0; i < rows.length; i++) {
        let av_rating = 0;
        connection.query(calc_avg_restaurant_rating(), [rows[i]['RestaurantName']], (err1, rows1, fields1) => {
          if(err1 == null) {
            //console.log(rows1);
            //console.log(rows[i]['RestaurantName']);
            if(rows1[0]) {
              av_rating = rows1[0]['AVG(rating)'];
            }
          } else {console.log("issue w some row in gen av ratings");}
        });
        connection.query('UPDATE Restaurant SET AverageRating = ? WHERE RestaurantName = ?;', [av_rating, rows[i]['RestaurantName']], (err1, rows1, fields1) => {
          if(err1 == null) {
            console.log("successfully added average rating!")
          } else {console.log("issue w some row in adding av ratings");}
        });
      }
    }
  });
}
// ********************************************** QUERIES.JS *********************************************************

function match_person() {
  const sql = `SELECT A.UserId AS UserIdA, B.UserId AS UserIdB
  FROM User AS A
   JOIN (SELECT UserId
  FROM User
  WHERE
      (CASE
            WHEN CuisinePreference = ? THEN 1
            ELSE 0
        END + 
        CASE
            WHEN MaximumBudget = ? THEN 1
            ELSE 0
        END + 
        CASE
            WHEN OptimalLengthOfDate = ? THEN 1
            ELSE 0
        END) = 
      (SELECT MAX(num_matched)
      FROM
            (SELECT 
            (CASE
                WHEN CuisinePreference = ? THEN 1
                ELSE 0
            END + 
            CASE
                WHEN MaximumBudget = ? THEN 1
                ELSE 0
            END + 
            CASE
                WHEN OptimalLengthOfDate = ? THEN 1
                ELSE 0
            END)
            AS num_matched
            FROM User
            WHERE (GenderIdentity = ?  AND GenderPreference = ? AND UserId <> ?)) AS max_matched_table)
  LIMIT 15) AS B
  ON A.UserId = ?;`;
  return sql;
}

// [UA.max_budget, UA.max_budget, UA.Allergies, UB.Allergies, UA.CuisinePreference, UB.CuisinePreference, UA.UserId, UB.UserId]
function match_to_restaurant() {
  const sql = `SELECT RestaurantName, Score
  FROM (
      SELECT Res.RestaurantName,
          CASE
              WHEN ? >= (SELECT AVG(OrderCost) FROM Reviews Rev WHERE Rev.RestaurantName = Res.RestaurantName) AND UB.MaximumBudget >= (SELECT AVG(OrderCost) FROM Reviews Rev WHERE Rev.RestaurantName = Res.RestaurantName) THEN 1
              ELSE 0
          END +
          CASE
              WHEN EXISTS (SELECT RestaurantName FROM Reviews Rev WHERE Rev.RestaurantName = Res.RestaurantName AND (? = Rev.Allergies OR ? = Rev.Allergies) AND Res.AverageRating > 3) THEN 1
              ELSE 0
          END +
          CASE
              WHEN ? = Res.Cuisine AND ? = Res.Cuisine THEN 1
              ELSE 0
          END AS Score
      FROM Restaurant Res
      CROSS JOIN Matches M
      JOIN User UA ON M.UserIdA = ?
      JOIN User UB ON M.UserIdB = ?
  ) AS ScoredRestaurants
  ORDER BY Score DESC
  LIMIT 15;`;
  return sql;
}

// [restaurant_name]
function calc_avg_restaurant_rating() {
  const sql = `SELECT RestaurantName, AVG(rating)
  FROM
    (SELECT RestaurantName, Rating as rating
        FROM Restaurant NATURAL JOIN Reviews) AS joined_table
  GROUP BY RestaurantName
  HAVING RestaurantName = ?`;
  return sql;
}

// [restaurant_name]
function find_top_review() { //find the top review
  const sql = `SELECT * FROM Reviews
  WHERE
  (RestaurantName, Rating)
  IN 
  (SELECT RestaurantName, MAX(Rating)
  FROM
      Reviews
  GROUP BY RestaurantName
  HAVING RestaurantName = ?)
  ORDER BY OrderCost`;
  return sql;
}

// this trigger checks to make sure all entries being added are unique
// so the user doesn't actually add themselved twice
// SHOULD INSTEAD REMOVE OTHER ENTRY AND ADD THIS ONE WITH THE CORRECT USERID
function check_unique_trigger() { //has been implemented!
  const sql = `
  CREATE TRIGGER check_unique
  BEFORE INSERT ON User
  FOR EACH ROW
  BEGIN
  SET @new_user = (SELECT UserId FROM User
                      WHERE Email = new.Email AND Password = new.Password AND FirstName = new.FirstName AND LastName = new.LastName AND
                      GenderIdentity = new.GenderIdentity AND GenderPreference = new.GenderPreference AND CuisinePreference = new.CuisinePreference AND 
                      MaximumBudget = new.MaximumBudget AND OptimalLengthOfDate = new.OptimalLengthOfDate AND Allergies = new.Allergies);
  
  IF @new_user IS NULL THEN
      INSERT INTO User
      VALUES(new.UserId, new.Email, new.Password, new.FirstName, new.LastName, new.GenderIdentity, new.GenderPreference, new.CuisinePreference, new.MaximumBudget, new.OptimalLengthOfDate, new.Allergies);
  END IF;
  END;
  `;
  return sql;
}

// set up stored procedure to get query 3 and query 4 info
function create_stored_procedure() { //implemented but never used.
  const sql = `
  CREATE PROCEDURE GetQueryInfo
  @RestaurantName VARCHAR(255)
  AS
  BEGIN
      SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
      SELECT RestaurantName, AVG(rating)
      FROM
      (SELECT RestaurantName, Rating as rating
          FROM Restaurant NATURAL JOIN Reviews) AS joined_table
      GROUP BY RestaurantName
      HAVING RestaurantName = @RestaurantName;

      SELECT * FROM Reviews
      WHERE
      (RestaurantName, Rating)
      IN 
      (SELECT RestaurantName, MAX(Rating)
      FROM
          Reviews
      GROUP BY RestaurantName
      HAVING RestaurantName = @RestaurantName)
      ORDER BY OrderCost
  END;`;
  return sql;
} 

// [restaurant_name]
function run_transaction() { //needs at least 2 adv queries
  const sql = `
  BEGIN TRANSACTION;
  SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

  IF @RestaurantName IS NOT NULL
  BEGIN
      EXEC GetQueryInfo @RestaurantName = '?';
  END

  COMMIT;`;
}