var dotenv = require('dotenv').load();
var express = require('express');
var app = express();
var http = require('http').Server(app);

var Routes = require('./src/js/server/routes/Routes');

app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));
app.set('views', './src/html');
app.set('view engine', 'jade');

Routes.init(app);

http.listen(app.get('port'),function(){
  console.log("Server up on",app.get('port'),"in",process.env.NODE_ENV);
});