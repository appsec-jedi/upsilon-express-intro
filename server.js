var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var songs = require('./data.json');

var app = express();

app.use(express.static('public'));
// convert any url encoded body into a JS object
// added to req.body
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/songs', function(req, res) {
  res.send(songs);
});

app.post('/songs', function(req,res){
  var validation = false;
  songs.forEach(function(song){
    if(req.body.title == song.title && req.body.artist == song.artist){
      validation = true;
    }else if (req.body.title == '' || req.body.artist == '' || req.body.album == ''){
      validation = true;
    }else{
      return validation;
    }
  });
    if (validation = true) {
      res.sendStatus(400);
    } else {
      songs.push(req.body);
      res.sendStatus(200);
    }
});

app.listen(3000);
