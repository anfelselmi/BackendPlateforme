const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    siteWeb: {
      type: String,
      required: true,
      unique: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    candidate: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
      },
    ],

    job: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
      },
    ],
  },
  { timestamps: true }
);
UserModel.discriminator('Company', companySchema);
module.exports = mongoose.model('Company');
