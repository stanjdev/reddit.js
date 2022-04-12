require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');

// Set db
require('./data/reddit-db');

const app = express();

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkAuth);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// POSTS RESOURCE
require('./controllers/posts')(app);

// COMMENTS RESOURCE
require('./controllers/comments')(app);

// AUTH RESOURCE
require('./controllers/auth')(app);

// REPLIES RESOURCE
require('./controllers/replies')(app);

app.listen(3000);

module.exports = app;
