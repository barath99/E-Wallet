//jshint esversion:6
var express = require("express");
var bodyParser = require("body-parser");
var session = require('express-session');
var path = require('path');
var mysql = require('mysql');
var ejs = require('ejs');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'e-wallet'
});


var app = express();
app.set("view engine", "ejs");

var urlencodedParser = app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));



const port = 3000;

app.use(express.static("Public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
  console.log("Success..");
});

app.post('/', function(req, res) {
  res.redirect('/login');
});

var username;
var password;
var name;
var setUsername;
var setPassword;
var setName;

app.post('/login', function(req, res) {
      username = req.body.username;
      password = req.body.password;
      console.log(username);
      if (username && password) {
        connection.query('SELECT * FROM userdetails WHERE Username = ? AND Password = ?', [username, password], function(error, results, fields) {
          if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/splash');

          } else {
            res.redirect('/failedLogin');

          }
          res.end();
        });
      } else {
        setName = req.body.setname;
        setUsername = req.body.setUsername;
        setPassword = req.body.setPassword;
        if (setUsername && setPassword) {
          connection.query("INSERT INTO userdetails (Name, Username,Password) VALUES (?, ?,?)",[setName,setUsername,setPassword], function (err, result) {
          if (err) throw err;
          console.log("New User added successfully..");
        });
        res.redirect('/login');
      }
    }
  });

      app.get('/login', function(req, res) {
        res.sendfile(__dirname + "/login.html");
      });

      app.get('/splash', function(req, res) {
        //connection.query('SELECT * FROM userdetails', (err,rows) => {
        //if(err) throw err;
        //console.log('Data received from Db:\n');
        //console.log(rows);
        res.sendfile(__dirname + "/splash.html");
        // });
      });
      app.post('/splash', function(req, res) {
        res.redirect('/home');
      });
      app.get('/failedLogin', function(req, res) {
        res.sendfile(__dirname + "/failedAttempt.html");
      });
      app.post('/failedLogin', function(req, res) {
        res.redirect('/login');
      });

      var NAME = "";
      var id;
      var MONEY;
      var TOGET;
      var TOGIVE;
      app.get('/home', function(req, res) {
        connection.query('SELECT * FROM userdetails WHERE Username = ? AND Password = ?', [username, password], function(error, rows) {
          if(error)
          throw error;
          else
          {
          for(var i=0;i<rows.length;i++)
          {
            if(rows[i].Username===username)
            {
              NAME=rows[i].Name;
              MONEY=rows[i].Balance;
              TOGET=rows[i].ToGet;
              TOGIVE=rows[i].ToGive;}
          }
          console.log(NAME);
          }
        });
        res.render('home',{nameOfUser:NAME,moneyBalance:MONEY,OweYou:TOGET,OweOthers:TOGIVE});

      });
      var addMoney;
      var INIBA;
      var netBalance;
      app.post('/home', function(req, res) {
            addMoney = req.body.AddMon;
            console.log("a");
          //  console.log(addMoney);
                connection.query("SELECT Balance FROM userdetails WHERE username = ?",[username], function (err, row) {
                  console.log("b");
                     INIBA = parseInt(row[0].Balance);
                     console.log(INIBA);
                                 console.log("c");
                                 netBalance=parseInt(addMoney)+parseInt(INIBA);
                                 console.log(addMoney);
                                 console.log("d");
                                 console.log(netBalance);

                });


              connection.query("UPDATE userdetails SET Balance = ? WHERE username = ?",[netBalance,username], function (err, result) {
                if (result.length > 0) {
                 location.reload();
                }

              });
            }
        );
      app.listen(port, () => console.log(`Example app listening on port ${port}!`));
