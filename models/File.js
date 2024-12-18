const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming you have a User model
  sharedLink: { type: String, required: true },
  password: { type: String, required: false }, // Password for protected access (optional)
  typeOfFile: { type: String, required: true }, // New field to store the type of file
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
