const express = require('express');
const { engine } = require('express-handlebars');

// Set db
require('./data/reddit-db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// POSTS RESOURCE
require('./controllers/posts')(app);

app.listen(3000);

module.exports = app;
