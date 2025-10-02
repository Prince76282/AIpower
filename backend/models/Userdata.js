const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: { type: String, required: true },
  reason: { type: String, required: true },
  profileImage: { type: String },
  streak: { type: Number, default: 0 },
  coins: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Userdata', userSchema);


// models/User.js
// // X:\AI power\backend\models\User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name:      { type: String, required: true },
//   age:       { type: String, required: true },
//   email:     { type: String, required: true },
//   education: { type: String, required: true },
//   reason:    { type: String, required: true },
//   profileImage: { type: String },
// });

// // ✅ Important: reuse existing model if it was already compiled
// // This line must be the ONLY export in this file.
// module.exports = mongoose.models.User || mongoose.model('User', userSchema);
