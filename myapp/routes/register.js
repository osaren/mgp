var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register.ejs');


});

router.post('/',function(req,res){

  //get the username
  var regUsername=req.body.username;

  // get the password
  var regPass = req.body.password;

	console.log("User name = "+ regUsername + " Password: " + regPass);
 
	// connect to the db
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3309,
      database : 'mgp'
 
    });
 
 
 
	connection.connect()
	var sql = "SELECT * from users WHERE username = '"+regUsername+"'";
    console.log(sql);
    connection.query(sql, function (err, rows, fields) {
		// ensuring to throw something wheter there's an error or not
		if(err) throw err;
		console.log("Connected to DB!");
        var exists = true;
		for(var i=0; i< rows.length; i++){
			console.log('Acc type: ', rows[i].acctype)
            exists = false;
 
		}
        console.log(exists);
 
        if(exists){

          console.log("does not exist");
          var sql = "INSERT INTO `mgp`.`users` (`username`, `password`, `acctype`) VALUES ( '"+regUsername+"', '"+regPass+"', 'customer')";
          connection.query(sql, function (err, rows, fields){
              
            // ensuring to throw something wheter there's an error or not
            if(err) throw err;
    
            // confirms if working
            console.log("Inserted new user!");
            res.send("Hello there = " + regUsername + " Password: " + regPass);
            
          });
           
        } 
			else {
				
				res.send("User already exists");
				console.log("exists");
        }
	});
});

module.exports = router;
