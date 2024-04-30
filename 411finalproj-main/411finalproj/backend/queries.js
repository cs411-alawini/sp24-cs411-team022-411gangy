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
  
  // [UB.max_budget, UA.Allergies, UB.Allergies, UA.CuisinePreference, UB.CuisinePreference, UA.UserId, UB.UserId]
  function match_to_restaurant() {
    const sql = `SELECT RestaurantName, Score
    FROM (
        SELECT Res.RestaurantName,
            CASE
                WHEN ? >= (SELECT AVG(OrderCost) FROM Reviews Rev WHERE Rev.RestaurantName = Res.RestaurantName) AND ? >= (SELECT AVG(OrderCost) FROM Reviews Rev WHERE Rev.RestaurantName = Res.RestaurantName) THEN 1
                ELSE 0
            END +
            CASE
                WHEN EXISTS (SELECT RestaurantName FROM Reviews Rev WHERE Rev.RestaurantName = Res.RestaurantName AND (Rev.DietaryRestrictions = ? OR Rev.DietaryRestrictions = ?) AND Res.AverageRating > 3) THEN 1
                ELSE 0
            END +
            CASE
                WHEN Res.Cuisine = ? AND Res.Cuisine = ? THEN 1
                ELSE 0
            END AS Score
        FROM Restaurant Res
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
  function check_unique_trigger() { //works!
    const sql = `
      CREATE TRIGGER check_unique
      BEFORE INSERT ON User
      FOR EACH ROW
      BEGIN
      DECLARE count INT;
      SELECT COUNT(*) INTO count FROM User
                          WHERE Email = new.Email AND Password = new.Password AND FirstName = new.FirstName AND LastName = new.LastName AND
                          GenderIdentity = new.GenderIdentity AND GenderPreference = new.GenderPreference AND CuisinePreference = new.CuisinePreference AND 
                          MaximumBudget = new.MaximumBudget AND OptimalLengthOfDate = new.OptimalLengthOfDate AND Allergies = new.Allergies;
      
      IF count > 0 THEN
          SIGNAL SQLSTATE '45000';
      END IF;
      END;
  
    `;
    return sql;
  }
  
  // set up stored procedure to get query 3 and query 4 info
  function create_stored_procedure() { //implemented but never used.
    const sql = `
      CREATE PROCEDURE GetQueryInfo (IN RestName VARCHAR(255))
      BEGIN
          IF RestName IS NOT NULL THEN
          SELECT RestaurantName, AVG(rating)
          FROM
          (SELECT RestaurantName, Rating as rating
              FROM Restaurant NATURAL JOIN Reviews) AS joined_table
          GROUP BY RestaurantName
          HAVING RestaurantName = RestName;
  
          SELECT * FROM Reviews
          WHERE
          (RestaurantName, Rating)
          IN 
          (SELECT RestaurantName, MAX(Rating)
          FROM
              Reviews
          GROUP BY RestaurantName
          HAVING RestaurantName = RestName)
          ORDER BY OrderCost;
      END IF;
      END;`;
    return sql;
  } 
  
  // [restaurant_name]
  function create_transaction() { //needs at least 2 adv queries - making a transaction does NOT work...
    const sql = `
    CREATE PROCEDURE create_transaction(IN RestName VARCHAR(255))
      BEGIN
      START TRANSACTION READ WRITE;
      IF RestName IS NOT NULL THEN
          CALL GetQueryInfo(RestName);
      END IF;
    END;
    `;
    return sql;
  }
  
  function run_transaction() {
    const sql = `CALL create_transaction(?);`;
    return sql;
  }
  /*
  function run_transaction() {
  DELIMITER //
  SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
  START TRANSACTION;
  
      CALL GetQueryInfo('Blue Ribbon Sushi Bar & Grill'); 
  
  COMMIT;
  
  GRANT SUPER ON *.* TO 'root'@'localhost';
  
  }*/