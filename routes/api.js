const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.get('/posts', postsController.getAllPosts);
router.put('/posts/:id/edit', postsController.editPost);
router.delete('/posts/deletePost/:id', postsController.deletePost);

router.use(require('../config/auth'));
router.post('/posts', checkAuth, postsController.create);

function checkAuth(req, res, next) {
  if (req.user) return next();
  console.log('in the checkAuth function');
  return res.status(401).json({msg: "Not Authorized"});
}

module.exports = router;