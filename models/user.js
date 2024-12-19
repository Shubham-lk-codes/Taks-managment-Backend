const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// Define User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to omit sensitive data (like password) when converting to JSON
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Remove password field
  return user;
};

module.exports = mongoose.model('User', UserSchema);
