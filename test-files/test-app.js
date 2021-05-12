var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var testApp = express();

// view engine setup
testApp.set('views', path.join(__dirname, 'views'));
testApp.set('view engine', 'ejs');

testApp.use(logger('dev'));
testApp.use(express.json());
testApp.use(express.urlencoded({ extended: false }));
testApp.use(cookieParser());
testApp.use(express.static(path.join(__dirname, 'public')));

testApp.use('/', indexRouter);
testApp.use('/users', usersRouter);



testApp.get('/getPlayers', function (req, res) {
    // put the data in the database
    // pulling in mysql
    var mysql = require('mysql');
    // set up a connection
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "test",
        password: ""
    });

    var output = ''; // this is where all the output goes that will be sent back at the end

    // Get information for the first players in playergroup a
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT * FROM players WHERE playergroup = 'a'";
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            output = output + '<select>';
            for(var i=0; i<result.length;i++){

                output = output + ' <option>'+result[i].playername+' </option>';
            }
            output = output + '</select>';

            // do the same thing again but for the players in group b.
            var sql = "SELECT * FROM players WHERE playergroup = 'b'";
            console.log(sql);
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                output = output + '<br>';
                output = output + '<select>';
                for(var i=0; i<result.length;i++){

                    output = output + ' <option>'+result[i].playername+' </option>';
                }
                output = output + '</select>';
                res.send(output);
            });
        });
    });
});

testApp.post('/getForumNames', function (req, res) {

    // put the data in the database
    // pulling in mysql
    var mysql = require('mysql');
    // set up a connection
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "test",
        password: ""
    });

    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT distinct forumname from forum;";
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            var output = '';
            for(var i=0; i<result.length;i++){

                output = output + '<a data-ajax="false" href="/?forumname='+ result[i].forumname + '">'+ result[i].forumname +'</a><br>';
            }
            res.send(output);
        });
    });
});

testApp.post('/getTopLevelComments', function (req, res) {

    var forumname = req.body.name;

    // put the data in the database
    // pulling in mysql
    var mysql = require('mysql');
    // set up a connection
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "test",
        password: ""
    });


    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT * FROM forum WHERE parent = 0 AND forumname = '"+forumname+"'";
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            var output = '';
            for(var i=0; i<result.length;i++){

                output = output + result[i].username + ' ' + result[i].comment + '<br>';
            }
            res.send(output);
        });
    });
});


testApp.post('/putInDatabase', function (req, res) {

    // catching the variables
    var username = req.body.username;
    var comment = req.body.comment;

    // put the data in the database
    // pulling in mysql
    var mysql = require('mysql');

    // set up a connection
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "test",
        password: ""
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO `test`.`forum` (`username`, `comment`, `forumname`) VALUES ('"+username+"', '"+comment+"', 'first');";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
    res.send('Data went to the database');
})

// catch 404 and forward to error handler
testApp.use(function(req, res, next) {
    next(createError(404));
});
// error handler
testApp.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = testApp;
