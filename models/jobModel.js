const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
    salary: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Jobs', jobSchema);
