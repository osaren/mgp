var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.post('/register',function(req,res){
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
      port : 3306,
      database : 'mgp'

    });

	connection.connect()
	var sql = "INSERT INTO `mgp`.`users` (`username`, `password`, `acctype`) VALUES ('"+regUsername+"', '"+regPass+"', 'customer')";
	connection.query(sql, function (err, rows, fields){
		// ensuring to throw something wheter there's an error or not
		if(err) throw err;

		// confirms if working
		console.log("Inserted new user!");
	});

	res.send("Hello there = " + regUsername + " Password: " + regPass);
});

app.post('/login',function(req,res){

	//get the username
	var username=req.body.username;

	// get the password
    var pass = req.body.password;

	// log username and pass
	console.log("User name = "+username);
	console.log("Password = "+pass);

	// connect to the db
	var mysql = require('mysql')
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  port : 3306,
	  database : 'mgp'

	});

	connection.connect();
	connection.query('SELECT * from users WHERE username = "'+username+'" AND password = "'+pass+'"', function (err, rows, fields) {
		// ensuring to throw something wheter there's an error or not
		if(err) throw err;
		console.log("Connected to DB!");
		for(var i=0; i< rows.length; i++){
			console.log('Acc type: ', rows[i].acctype)

			// we can only ever send back ONE res.send(). This is the response that will be sent back to the user.
			// in this case, we are sending back the account type to the JavaScript that called this piece of codePointAt
			// to make sure that we will send them to the correct page.
			res.send(rows[i].acctype); // send the account type back to jQuery mobile.
		}
	});
    connection.end();
});

app.post('/teams',function(req,res){
	//get the values of each position in the team

	var goal_keeper = req.body.gk;
	var right_back = req.body.rb;
	var center_back_1 = req.body.cb1;
	var center_back_2 = req.body.cb2;
	var left_back = req.body.lb;
	var right_mid = req.body.rm;
	var center_mid_1 = req.body.cm1;
	var center_mid_2 = req.body.cm2;
	var left_mid = req.body.lm;
	var striker1 = req.body.st1;
	var striker2 = req.body.st2;

	//console.log("Team = "+ gk + rb + cb1 + cb2 + lb + rm + cm1 + cm2 + lm + st1 + st2);

	// connect to the db
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'mgp'

    });

	connection.connect()
	var sql = "INSERT INTO `mgp`.`teams` (`gk`, `rb`, `cb1`, `cb2`, `lb`, `rm`, `cm1`, `cm2`, `lm`, `st1`, `st2`) VALUES ('"+goal_keeper+"', '"+right_back+"', '"+center_back_1+"', '"+center_back_2+"', '"+left_back+"', '"+right_mid+"', '"+center_mid_1+"', '"+center_mid_2+"', '"+left_mid+"', '"+striker1+"', '"+striker2+"')";

	connection.query(sql, function (err, rows, fields){
		// ensuring to throw something wheter there's an error or not
		if(err) throw err;

		// confirms if working
		console.log("Inserted new team!");
	});

	res.send("Team submitted!");
});

// ----- GET DATA LEAGUE TABLES ADMIN
app.post('/getData_admin',function(req,res){
    // Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * FROM premier_league, serie_a, la_liga WHERE premier_league.pos = serie_a.pos AND premier_league.pos = la_liga.pos', function (err, rows, fields) {
      if (err) throw err
      var output = '';
      for(var i=0; i< rows.length; i++){

           var pos = rows[i].Pos + ' ';
           var team = rows[i].Team + ' ';
		   var pl = rows[i].Pl + ' ';
           var won = rows[i].W + ' ';
		   var draw = rows[i].D + ' ';
           var loss = rows[i].L + ' ';
		   var f = rows[i].F + ' ';
           var against = rows[i].A + ' ';
		   var gd = rows[i].GD + ' ';
		   var points = rows[i].Pts + '<br>';

           output = output + pos + team + pl + won + draw + loss + f + against + gd + points;

	       var row_table = rows[i].pos;

           var pos_break = pos.split('-');

      }
      res.send(output);

    })

    connection.end()

});

// ----- GET DATA PL
app.post('/getData_pl',function(req,res){
    // Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * from premier_league', function (err, rows, fields) {
      if (err) throw err
      var output = '';
      for(var i=0; i< rows.length; i++){

           var pos = rows[i].Pos + '     ';
           var team = rows[i].Team + '     ';
		   var pl = rows[i].Pl + '     ';
           var won = rows[i].W + '     ';
		   var draw = rows[i].D + '     ';
           var loss = rows[i].L + '     ';
		   var f = rows[i].F + '     ';
           var against = rows[i].A + '     ';
		   var gd = rows[i].GD + '     ';
		   var points = rows[i].Pts + '<br>';

           output = output + pos + team + pl + won + draw + loss + f + against + gd + points;

	       var row_table = rows[i].pos;

           var pos_break = pos.split('-');

      }
      res.send(output);

    })

    connection.end()

});

// ----- GET DATA LA LIGA
app.post('/getData_liga',function(req,res){
    // Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * from la_liga', function (err, rows, fields) {
      if (err) throw err
      var output = '';
      for(var i=0; i< rows.length; i++){

           var pos = rows[i].Pos + '     ';
           var team = rows[i].Team + '     ';
		   var pl = rows[i].Pl + '     ';
           var won = rows[i].W + '     ';
		   var draw = rows[i].D + '     ';
           var loss = rows[i].L + '     ';
		   var f = rows[i].F + '     ';
           var against = rows[i].A + '     ';
		   var gd = rows[i].GD + '     ';
		   var points = rows[i].Pts + '<br>';

           output = output + pos + team + pl + won + draw + loss + f + against + gd + points;

	       var row_table = rows[i].pos;

           var pos_break = pos.split('-');

      }
      res.send(output);

    })

    connection.end()

});

// ----- GET DATA SERIE A
app.post('/getData_serie',function(req,res){
    // Connect to the database
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      port : 3306,
      database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * from serie_a', function (err, rows, fields) {
      if (err) throw err
      var output = '';
      for(var i=0; i< rows.length; i++){

           var pos = rows[i].Pos + '     ';
           var team = rows[i].Team + '     ';
		   var pl = rows[i].Pl + '     ';
           var won = rows[i].W + '     ';
		   var draw = rows[i].D + '     ';
           var loss = rows[i].L + '     ';
		   var f = rows[i].F + '     ';
           var against = rows[i].A + '     ';
		   var gd = rows[i].GD + '     ';
		   var points = rows[i].Pts + '<br>';

           output = output + pos + team + pl + won + draw + loss + f + against + gd + points;

	       var row_table = rows[i].pos;

           var pos_break = pos.split('-');

      }
      res.send(output);

    })

    connection.end()

});

// get PLAYERS for dropdown in 'create a team'
app.post('/getData_players',function(req,res){

    // connect to the db
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3306,
        database : 'mgp'

    });

    connection.connect();
    connection.query('SELECT * from players', function (err, rows, fields) {
        // ensuring to throw something wheter there's an error or not
        if(err) throw err;

        var output = '';
        for(var i=0; i< rows.length; i++){

            var player = rows[i].player + '     ';

            output = output + player;

            var row_table = rows[i].player;

            var pos_break = player.split('-');

        }

        console.log("Connected to player table!");
        res.send(output);
    });
    connection.end();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
