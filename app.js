var express = require('express');
var path = require('path');
var mongojs = require('mongojs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = mongojs('battleship', ['battleship']);

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// ========================================================
app.get('/', function(req, res){
	res.render('index', { title: 'Battleship' });
	// Remove all entries from the database
	db.battleship.remove({});
});

app.post('/', function(req, res){
	res.render('setup');
});

// Getting the set up page
app.get('/:name', function(req, res) {
	var name = req.params.name;
	var nameObj = { 'name' : name };
	res.render('setup.jade', { name: name });
	db.battleship.insert(nameObj);
	db.battleship.find(function(err, docs){
		console.log("This is your DB: " + docs);
	});
});

// Getting the game page
app.get('/:name/game', function(req, res){
	res.render('game.jade');
	console.log("GET to '/:name/game");
});

// Posting your ship coordinates 
app.post('/:name/game', function(req, res){
	var coords = req.body;
	var coordsObj = JSON.stringify(coords);
	try{
		// Add coordinates to the first player
		db.battleship.update({ }, { $push : { shipPlacements : { $each: coords }}});
	} catch (e) {
   		console.log(e);
	}
	console.log(coordsObj);
	res.render('game.jade');
});

app.listen(4000);
console.log("Server running on port 4000");

module.exports = app;
