const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost } = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken');

router.post('/create', verifyToken, createPost);
router.get('/', verifyToken,getPosts);
router.post('/:id/like', verifyToken, likePost);

module.exports = router;
