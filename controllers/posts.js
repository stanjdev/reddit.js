const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
  
  // NEW 
  app.get('/posts/new', (req, res) => {
    const currentUser = req.user;
    res.render('posts-new', { currentUser });
  })
  
  // CREATE
  app.post('/posts/new', (req, res) => {
    if (req.user) {
      const userId = req.user._id;
      const post = new Post(req.body);
      post.author = userId;
      post
        .save()
        .then(() => User.findById(userId))
        .then((user) => {
          user.posts.unshift(post);
          user.save();
          return res.redirect(`/posts/${post._id}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return res.status(401) // UNAUTHORIZED
    }
  });
  
  // INDEX
  app.get('/', async (req, res) => {
    const currentUser = req.user;
    console.log(req.cookies);
    try {
      const posts = await Post.find({}).lean().populate('author');
      return res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SHOW - LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {
    const currentUser = req.user;
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments').populate('author');
      return res.render('posts-show', { post, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    const currentUser = req.user;
    const { subreddit } = req.params;
    try {
      const posts = await Post.find({ subreddit }).lean().populate('author');
      return res.render('posts-index', { posts, currentUser });
    } catch(err) {
      console.log(err);
    }
  });



}

