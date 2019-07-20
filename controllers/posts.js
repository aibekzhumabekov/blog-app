const Post = require('../models/post');

module.exports = {
  getAllPosts,
  create,
  deletePost,
  editPost
};

function getAllPosts(req, res) {
  Post.find({}, function(err, posts) {
    if (err) console.log(err);
    res.status(200).json(posts);
  });
}

function create(req, res) {
  console.log('Hit create')
  Post.create(req.body, function(err, post) {
    if (err) throw err;

    res.status(200).json(post);
  })
}

function editPost(req,res){
  console.log("In edit post function")
  console.log(req.body)
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(function(post){
      res.status(200).json(post)
  })
}

function deletePost(req,res){
  console.log(req.body)
  console.log(req.params.id)
  console.log("In delete Function")
  
  Post.findByIdAndDelete(req.params.id).then(function(post){
      console.log(req.params.id)
      res.status(200).json(post)
  })
}
 