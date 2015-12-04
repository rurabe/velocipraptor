'use strict';

require('dotenv').load();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const session = require('express-session')
const RedisStore = require('connect-redis')(session);

app.use(session({ store: new RedisStore({url: process.env.REDIS_URL}), secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: false}));
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));
app.set('views', './src/html');
app.set('view engine', 'jade');



const Routes = require('./src/js/routes');
Routes.init(app);

http.listen(app.get('port'),function(){
  console.log("Server up on",app.get('port'),"in",process.env.NODE_ENV);
});