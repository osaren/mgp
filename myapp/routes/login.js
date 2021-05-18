var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login.ejs');


});

router.post('/',function(req,res){

    //get the username
    const username=req.body.username;

    // get the password
    const pass = req.body.password;

    // log username and pass
    console.log("User name = "+username);
    console.log("Password = "+pass);

    // connect to the db
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3309,
        database : 'mgp'

    });

    connection.connect();
    connection.query('SELECT * from users WHERE username = "'+username+'" AND password = "'+pass+'"', function (err, rows) {
        // ensuring to throw something whether there's an error or not
        if(err) throw err;
        console.log("Connected to DB!");
        for(let i=0; i< rows.length; i++){
            console.log('Acc type: ', rows[i].acctype)

            res.send(rows[i].acctype);
        }
    });
    connection.end();
});
module.exports = router;
