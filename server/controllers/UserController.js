const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = async (req, res) => {
   const { email, password } = req.body;

   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
         if (err) return res.status(500).json({ error: err.message });
         res.status(201).json({ message: 'User registered successfully' });
      });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

const login = (req, res) => {
   const { email, password } = req.body;

   db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: 'User not found' });

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token , userId: user.id  });
   });
};

module.exports = { register, login };
