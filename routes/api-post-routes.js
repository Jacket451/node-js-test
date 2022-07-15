const express = require('express');
const {
  getPost, 
  deletePost,
  editPost,
  getPosts,
  addPost
} = require('../controllers/api-post-controller');

const router = express.Router();

// Get all posts
router.get('/api/posts', getPosts);
// Add New Posts
router.post('/api/post', addPost);
// Get Post by ID
router.get('/api/posts/:id', getPost);
// Delete Post by ID
router.delete('/api/posts/:id', deletePost);
// Update post by ID
router.put('/api/edit/:id', editPost);

module.exports = router;
