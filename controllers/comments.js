const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = (app) => {

  // CREATE Comment
  app.post('/posts/:postId/comments', (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);
    comment.author = req.user._id;

    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      // REDIRECT TO THE ROOT
      .then(() => Post.findById(req.params.postId))
      .then((post) => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then((post) => res.redirect(`/posts/${post._id}`))
      .catch((err) => {
        console.log(err);
      });
  });




};
