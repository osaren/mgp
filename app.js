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
	
	var gk = req.body.gk;
	var rb = req.body.rb;
	var cb1 = req.body.cb1;
	var cb2 = req.body.cb2;	
	var lb = req.body.lb;
	var rm = req.body.rm;
	var cm1 = req.body.cm1;
	var cm2 = req.body.cm2;
	var lm = req.body.lm;
	var st1 = req.body.st1;
	var st2 = req.body.st2;
 
	console.log("Team submitted");
 
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
	var sql = "INSERT INTO `mgp`.`teams` ('gk', 'rb', 'cb1', 'cb2', 'lb', 'rm', 'cm1', 'cm2', 'lm', 'st1', 'st2') VALUES ('"+gk+"', '"+rb+"', '"+cb1+"', '"+cb2+"', '"+lb+"', '"+rm+"', '"+cm1+"', '"+cm2+"', '"+lm+"', '"+st1+"', '"+st2+"')";
	connection.query(sql, function (err, rows, fields){
		// ensuring to throw something wheter there's an error or not
		if(err) throw err;
 
		// confirms if working
		console.log("Inserted new team!");
	});

	res.send("Team submitted!");
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
