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
