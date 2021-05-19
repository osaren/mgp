const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// routes
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const forumRouter = require('./routes/forum');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/forum', forumRouter);
app.use( express.static( "public" ) );
app.use('/scripts', express.static(__dirname + '/scripts/'));

app.post('/forumIndex',function(req,res){
        // pulling in mysql
        const mysql = require('mysql');
        // set up a connection
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            port : 3309,
            database: "mgp",
            password: ""
        });
    
        let output = ''; // this is where all the output goes that will be sent back at the end
    
        // Get information for the first players in playergroup a
        con.connect(function(err) {
            if (err) throw err;
            const sql = "SELECT * FROM forum";
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                //console.log(result);
    
                output = output + '<select>';
                for(let i=0; i<result.length;i++){
    
                    output = output + ' <option>'+result[i].player+' </option>';
                }
                output = output + '</select>';
    
                res.send(output);
            });
        });
});

app.post('/teams',function(req,res){
    //get the values of each position in the team

    const goal_keeper = req.body.gk;
    const right_back = req.body.rb;
    const center_back_1 = req.body.cb1;
    const center_back_2 = req.body.cb2;
    const left_back = req.body.lb;
    const right_mid = req.body.rm;
    const center_mid_1 = req.body.cm1;
    const center_mid_2 = req.body.cm2;
    const left_mid = req.body.lm;
    const striker1 = req.body.st1;
    const striker2 = req.body.st2;

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
    const sql = "INSERT INTO `mgp`.`teams` (`gk`, `rb`, `cb1`, `cb2`, `lb`, `rm`, `cm1`, `cm2`, `lm`, `st1`, `st2`) VALUES ('"+goal_keeper+"', '"+right_back+"', '"+center_back_1+"', '"+center_back_2+"', '"+left_back+"', '"+right_mid+"', '"+center_mid_1+"', '"+center_mid_2+"', '"+left_mid+"', '"+striker1+"', '"+striker2+"')";

    connection.query(sql, function (err){
        // ensuring to throw something whether there's an error or not
        if(err) throw err;

        // confirms if working
        console.log("Inserted new team!");
    });

    res.send("Team submitted!");
});

// ----- GET DATA LEAGUE TABLES ADMIN
app.post('/getData_admin',function(req,res){
    // Connect to the database
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3309,
        database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * FROM premier_league, serie_a, la_liga WHERE premier_league.pos = serie_a.pos AND premier_league.pos = la_liga.pos', function (err, rows) {
        if (err) throw err
        let output = '';
        for(let i=0; i< rows.length; i++){

            const pos = rows[i].Pos + ' ';
            const team = rows[i].Team + ' ';
            const pl = rows[i].Pl + ' ';
            const won = rows[i].W + ' ';
            const draw = rows[i].D + ' ';
            const loss = rows[i].L + ' ';
            const f = rows[i].F + ' ';
            const against = rows[i].A + ' ';
            const gd = rows[i].GD + ' ';
            const points = rows[i].Pts + '<br>';

            output = output + pos + team + pl + won + draw + loss + f + against + gd + points;
            console.log(output)
        }

        res.send(output);

    })

    connection.end()

});

// ----- GET DATA PL
app.post('/getData_pl',function(req,res){
    // Connect to the database
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3309,
        database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * from premier_league', function (err, rows) {
        if (err) throw err
        let output = '';
        for(let i=0; i< rows.length; i++){

            const pos = rows[i].Pos + '     ';
            const team = rows[i].Team + '     ';
            const pl = rows[i].Pl + '     ';
            const won = rows[i].W + '     ';
            const draw = rows[i].D + '     ';
            const loss = rows[i].L + '     ';
            const f = rows[i].F + '     ';
            const against = rows[i].A + '     ';
            const gd = rows[i].GD + '     ';
            const points = rows[i].Pts + '<br>';

            output = output + pos + team + pl + won + draw + loss + f + against + gd + points;
            pos.split('-');
        }
        res.send(output);

    })

    connection.end()

});

// ----- GET DATA LA LIGA
app.post('/getData_liga',function(req,res){
    // Connect to the database
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3309,
        database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * from la_liga', function (err, rows) {
        if (err) throw err
        let output = '';
        for(let i=0; i< rows.length; i++){

            const pos = rows[i].Pos + '     ';
            const team = rows[i].Team + '     ';
            const pl = rows[i].Pl + '     ';
            const won = rows[i].W + '     ';
            const draw = rows[i].D + '     ';
            const loss = rows[i].L + '     ';
            const f = rows[i].F + '     ';
            const against = rows[i].A + '     ';
            const gd = rows[i].GD + '     ';
            const points = rows[i].Pts + '<br>';

            output = output + pos + team + pl + won + draw + loss + f + against + gd + points;

        }
        res.send(output);

    })

    connection.end()

});

// ----- GET DATA SERIE A
app.post('/getData_serie',function(req,res){
    // Connect to the database
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3309,
        database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * from serie_a', function (err, rows) {
        if (err) throw err
        let output = '';
        for(let i=0; i< rows.length; i++){

            const pos = rows[i].Pos + '     ';
            const team = rows[i].Team + '     ';
            const pl = rows[i].Pl + '     ';
            const won = rows[i].W + '     ';
            const draw = rows[i].D + '     ';
            const loss = rows[i].L + '     ';
            const f = rows[i].F + '     ';
            const against = rows[i].A + '     ';
            const gd = rows[i].GD + '     ';
            const points = rows[i].Pts + '<br>';

            output = output + pos + team + pl + won + draw + loss + f + against + gd + points;

        }
        res.send(output);

    })

    connection.end()

});

// ----- GET PLAYER DATA LA LIGA
app.post('/getData_ligaPlayer',function(req,res){
    // Connect to the database
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3309,
        database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * from laligaplayer', function (err, rows) {
        if (err) throw err
        let output = '';
        for(let i=0; i< rows.length; i++){

            const Rank = rows[i].Rank + '     ';
            const Name = rows[i].Name + '     ';
            const GoalsGl = rows[i].GoalsGl + '     ';
            const AssistA = rows[i].AssistA + '     ';
            const PlayedP = rows[i].PlayedP + '     ';
            const Goalsper90 = rows[i].Goalsper90 + '     ';
            const MinsperGoalMPG = rows[i].MinsperGoalMPG + '     ';
            const TotalShots = rows[i].TotalShots + '     ';
            const GoalConversion = rows[i].GoalConversion + '     ';
            const ShotAccuracy = rows[i].ShotAccuracy + '<br>';

            output = output + Rank + Name + GoalsGl + AssistA + PlayedP + Goalsper90 + MinsperGoalMPG + TotalShots + GoalConversion + ShotAccuracy;

        }
        res.send(output);

    })

    connection.end()

});

// ----- GET PLAYER DATA PREMIER LEAGUE
app.post('/getData_premPlayer',function(req,res){
    // Connect to the database
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3309,
        database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * from premplayer', function (err, rows) {
        if (err) throw err
        let output = '';
        for(let i=0; i< rows.length; i++){

            const Rank = rows[i].Rank + '     ';
            const Name = rows[i].Name + '     ';
            const GoalsGl = rows[i].GoalsGl + '     ';
            const AssistA = rows[i].AssistA + '     ';
            const PlayedP = rows[i].PlayedP + '     ';
            const Goalsper90 = rows[i].Goalsper90 + '     ';
            const MinsperGoalMPG = rows[i].MinsperGoalMPG + '     ';
            const TotalShots = rows[i].TotalShots + '     ';
            const GoalConversion = rows[i].GoalConversion + '     ';
            const ShotAccuracy = rows[i].ShotAccuracy + '<br>';

            output = output + Rank + Name + GoalsGl + AssistA + PlayedP + Goalsper90 + MinsperGoalMPG + TotalShots + GoalConversion + ShotAccuracy;
        }
        res.send(output);

    })

    connection.end()

});

// ----- GET PLAYER DATA Serie A
app.post('/getData_serieaPlayer',function(req,res){
    // Connect to the database
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port : 3309,
        database : 'mgp'
    });

    connection.connect()

    connection.query('SELECT * from serieaplayer', function (err, rows) {
        if (err) throw err
        let output = '';
        for(let i=0; i< rows.length; i++){

            const Rank = rows[i].Rank + '     ';
            const Name = rows[i].Name + '     ';
            const GoalsGl = rows[i].GoalsGl + '     ';
            const AssistA = rows[i].AssistA + '     ';
            const PlayedP = rows[i].PlayedP + '     ';
            const Goalsper90 = rows[i].Goalsper90 + '     ';
            const MinsperGoalMPG = rows[i].MinsperGoalMPG + '     ';
            const TotalShots = rows[i].TotalShots + '     ';
            const GoalConversion = rows[i].GoalConversion + '     ';
            const ShotAccuracy = rows[i].ShotAccuracy + '<br>';

            output = output + Rank + Name + GoalsGl + AssistA + PlayedP + Goalsper90 + MinsperGoalMPG + TotalShots + GoalConversion + ShotAccuracy;

        }
        res.send(output);

    })

    connection.end()

});

// get PLAYERS for dropdown in 'create a team'
app.get('/getData_players', function (req, res) {
    // put the data in the database
    // pulling in mysql
    const mysql = require('mysql');
    // set up a connection
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
		port : 3309,
        database: "mgp",
        password: ""
    });

    let output = ''; // this is where all the output goes that will be sent back at the end

    // Get information for the first players in playergroup a
    con.connect(function(err) {
        if (err) throw err;
        const sql = "SELECT * FROM players";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            //console.log(result);

            output = output + '<select>';
            for(let i=0; i<result.length;i++){

                output = output + ' <option>'+result[i].player+' </option>';
            }
            output = output + '</select>';

            res.send(output);
        });
    });
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