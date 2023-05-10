const mongoose = require("mongoose");
const candidacySchema = new mongoose.Schema(
  {
    cv: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },

    jobOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    },
    candidate: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
      },
    company:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
  },
  
  { timestamps: true }
);
module.exports = mongoose.model("Candidacies", candidacySchema);
