const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  candidacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidacies',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
});
UserModel.discriminator('Candidate', candidateSchema);
module.exports = mongoose.model('Candidate');
