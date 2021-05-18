var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register.ejs');


});

router.post('/',function(req,res){
  //get the username
  const regUsername=req.body.username;

  // get the password
  const regPass = req.body.password;

  console.log("User name = "+ regUsername + " Password: " + regPass);

  // connect to the db
  const mysql = require('mysql')
  const connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3309,
      database : 'mgp'

  });

  connection.connect()
  const sql = "INSERT INTO `mgp`.`users` (`username`, `password`, `acctype`) VALUES ('"+regUsername+"', '"+regPass+"', 'customer')";
  connection.query(sql, function (err){
      // ensuring to throw something whether there's an error or not
      if(err) throw err;

      // confirms if working
      console.log("Inserted new user!");
  });

  res.send("Hello there = " + regUsername + " Password: " + regPass);
});

module.exports = router;
