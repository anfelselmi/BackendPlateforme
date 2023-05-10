const candidacyModel = require('../models/candidacyModel');
module.exports = {
  createcandidacy: function (req, res) {
    console.log('file', req.file.filename);

    candidacyModel.create(
      {
        cv: req.file.filename,
        nom: req.body.nom,
        prenom: req.body.prenom,
        candidate: req.body.candidate,
        jobOffer: req.body.jobOffer,
        company: req.body.company,
      },
      function (err, candidacy) {
        if (err) {
          res.json({
            message: 'error add model' + err,
            data: null,
            status: 500,
          });
        } else {
          res.json({
            message: 'Model created successfully',
            data: candidacy,
            status: 200,
          });
        }
      }
    );
  },

  getAllcandidacy: async (req, res) => {
    candidacyModel
      .find({})
      .populate('candidate')
      .populate('jobOffer')
      .exec((err, candidacy) => {
        if (err) {
          res.json({
            message: 'error get all candidacys' + err,
            data: null,
            status: 500,
          });
        } else {
          res.json({
            message: 'all candidacys in system',
            data: candidacy,
            status: 200,
          });
        }
      });
  },

  getcandidacyById: function (req, res) {
    candidacyModel
      .findById({ _id: req.params.id })
      .populate('candidate')
      .populate('jobOffer')
      .populate('company'),
      (err, candidacy) => {
        if (err) {
          res.json({
            message: 'error get one candidacy' + err,
            data: null,
            status: 500,
          });
        } else {
          res.json({
            message: 'one candidacy in system',
            data: candidacy,
            status: 200,
          });
        }
      };
  },

  deletecandidacyById: function (req, res) {
    candidacyModel.findByIdAndDelete(
      { _id: req.params.id },
      (err, candidacy) => {
        if (err) {
          res.json({
            message: 'error delete  one candidacy' + err,
            data: null,
            status: 500,
          });
        } else {
          res.json({
            message: 'one candidacy delete system',
            data: candidacy,
            status: 200,
          });
        }
      }
    );
  },

  updatecandidacyById: function (req, res) {
    candidacyModel.updateOne(
      { _id: req.params.id },
      req.body,
      (err, candidacy) => {
        if (err) {
          res.json({
            message: 'error update  one candidacy' + err,
            data: null,
            status: 500,
          });
        } else {
          res.json({
            message: 'one candidacy updated',
            data: candidacy,
            status: 200,
          });
        }
      }
    );
  },

  getByCandidatId: function (req, res) {
    candidacyModel
      .find({ candidat: req.params.id })
      .populate('candidate')
      .populate('jobOffer')
      .populate('company')
      .exec((err, job) => {
        if (err) {
          res.json({
            message: 'failed' + err,
            data: null,
            status: 500,
          });
        } else {
          res.json({
            message: 'list of candidacy by candidat Id',
            data: job,
            status: 200,
          });
        }
      });
  },

  getByCompanyId: function (req, res) {
    candidacyModel
      .find({ company: req.params.id })
      .populate('candidate')
      .populate('jobOffer')
      .exec((err, job) => {
        if (err) {
          res.json({
            message: 'failed' + err,
            data: null,
            status: 500,
          });
        } else {
          res.json({
            message: 'list of candidacy by candidat Id',
            data: job,
            status: 200,
          });
        }
      });
  },
};
