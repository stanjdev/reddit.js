const express = require('express');
const exphbs = require('express-handlebars');
const engine = exphbs.engine;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});


// POSTS RESOURCE

// NEW 
app.get('/posts/new', (req, res) => {
  res.render('posts-new', {});
})

// CREATE
app.post('/posts', (req, res) => {
  res.redirect(`/posts/${postId}`);
})

// INDEX

// SHOW
app.get('/posts:id', (req, res) => {
  req.params.id
  res.render('posts-show', { post })
})

// EDIT
app.get('/posts/:id/edit', (req, res) => {
  // render edit form
})

// UPDATE
app.put('/posts/:id', (req, res) => {
  // redirect to show post
})

// DESTROY
app.delete('/posts/:id', (req, res) => {
  // redirect index
})

app.listen(3000);
