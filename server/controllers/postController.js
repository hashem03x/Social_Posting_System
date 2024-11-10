// controllers/postController.js
const db = require('../config/db');

const createPost = (req, res) => {
   const { userId, content } = req.body;

   db.query('INSERT INTO posts (user_id, content) VALUES (?, ?)', [userId, content], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Post created successfully' });
   });
};

const getPosts = (req, res) => {
   const query = `
      SELECT posts.id, posts.content, posts.likes, posts.user_id, users.email,posts.created_at
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.id DESC
   `;

   db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
   });
};


const likePost = (req, res) => {
   const postId = req.params.id;
   const userId = req.user.id; // Assuming `req.user` contains authenticated user data
 
   // Check if the user has already liked the post
   db.query(
     'SELECT * FROM post_likes WHERE user_id = ? AND post_id = ?',
     [userId, postId],
     (err, results) => {
       if (err) return res.status(500).json({ error: err.message });
       if (results.length > 0) return res.status(400).json({ message: 'Already liked' });
 
       // Insert like record
       db.query(
         'INSERT INTO post_likes (user_id, post_id) VALUES (?, ?)',
         [userId, postId],
         (err, results) => {
           if (err) return res.status(500).json({ error: err.message });
 
           // Increment likes count in posts table
           db.query(
             'UPDATE posts SET likes = likes + 1 WHERE id = ?',
             [postId],
             (err) => {
               if (err) return res.status(500).json({ error: err.message });
               res.status(200).json({ message: 'Post liked' });
             }
           );
         }
       );
     }
   );
 };
 

module.exports = { createPost, getPosts, likePost };
