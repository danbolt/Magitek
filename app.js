
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var util = require('util');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

if (!fs.existsSync('./saves'))
{
	fs.mkdirSync('./saves');
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

// query save info JSON
app.get('/saveInfo', function(req, res) {

	var saveInfoData = [];

	var files = fs.readdirSync('./saves');
	files.forEach(function(entry)
	{
		saveInfoData.push({name: entry});
	});

	res.send(saveInfoData);
});

// upload save
app.post('/save', function(req, res) {
	res.end();

	if (req.files.savegame.size == 8192)
	{
		var d = new Date();
		fs.rename(req.files.savegame.path, './saves/save-' + d.getTime());
	}
} );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
