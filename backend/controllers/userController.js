const User = require('../models/Userdata'); // Assuming User model is also CommonJS
const path = require('path');
const fs = require('fs');

const createUser = async (req, res) => {
  try {
    const { name, age, email, education, reason } = req.body;
    
    // Check if a user with this email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    user = new User({
      name,
      age,
      email,
      education,
      reason,
      profileImage: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    let profileImageFilename;

    if (req.file) {
      profileImageFilename = `/uploads/${req.file.filename}`;
      updates.profileImage = profileImageFilename;

      // Optional: Delete old profile image if it exists
      const user = await User.findById(req.params.id);
      if (user && user.profileImage && user.profileImage !== profileImageFilename) {
        const oldImagePath = path.join(__dirname, '..', user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Error deleting old profile image:', err);
          });
        }
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true } // runValidators ensures schema validators are applied on update
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optional: Delete profile image if it exists
    if (user.profileImage) {
      const imagePath = path.join(__dirname, '..', user.profileImage);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Error deleting profile image:', err);
        });
      }
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  deleteUser
};


// const User = require('../models/Userdata');
// const path = require('path');

// exports.createUser = async (req, res) => {
//   try {
//     const { name, age, email, education, reason } = req.body;
//     const profileImage = req.file ? path.join('uploads', req.file.filename) : null;

//     const user = await User.create({ name, age, email, education, reason, profileImage });
//     res.status(201).json({ message: 'User saved', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to save user' });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// };
