const Post = require('../models/post');

module.exports = (app) => {
  
  // NEW 
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
  })
  
  // CREATE
  app.post('/posts/new', (req, res) => {
    const post = new Post(req.body);
    post.save(() => res.redirect('/'));
    // res.redirect(`/posts/${postId}`);
  })
  
  // INDEX
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SHOW - LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments');
      return res.render('posts-show', { post });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      return res.render('posts-index', { posts });
    } catch(err) {
      console.log(err);
    }
  });



}

