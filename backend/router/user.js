const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password, role, name } = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({
        error: 'Please provide all required fields (name, username, password)'
      });
    }

    const user = await User.create({
      username,
      password,
      role: role || 'user',
      name
    });

    const token = user.getJWTToken();

    res.status(201).json({
      success: true,
      token,
      user,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({
      error: error.message
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid Username'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid Password'
      });
    }
console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("JWT_EXPIRE =", process.env.JWT_EXPIRE);
    const token = user.getJWTToken();
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        name: user.name
      }
    });
  // } catch (error) {
  //   res.status(500).json({
  //     message: error.message
  //   });
  }catch (error) {
  console.error("LOGIN ERROR:", error);

  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}
});

module.exports = router;
