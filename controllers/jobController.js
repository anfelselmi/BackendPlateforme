const JobModel = require('../models/jobModel');
const CompanyModel = require('../models/companyModel');
const jobModel = require('../models/jobModel');
module.exports = {
  create: async (req, res) => {
    jobModel.create(req.body, function (err, offre) {
      if (err) {
        res.json({
          message: 'error add job offer' + err,
          data: null,
          status: 500,
        });
      } else {
        res.json({
          message: 'job offer added successfuly',
          data: offre,
          status: 200,
        });
      }
    });
  },
  getAll: async (req, res) => {
    try {
      const listJob = await JobModel.find({}).populate('company');
      res.status(200).json({
        message: 'list of job offer',
        data: listJob,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'error',
      });
    }
  },
  getById: function (req, res) {
    JobModel.findById({ _id: req.params.id })
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
            message: 'job offer by Id',
            data: job,
            status: 200,
          });
        }
      });
  },

  getByCompanyId: function (req, res) {
    JobModel.find({ company: req.params.id })
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
            message: 'list of job offer by company Id',
            data: job,
            status: 200,
          });
        }
      });
  },

  update: async (req, res) => {
    try {
      await JobModel.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json({
        message: 'success to update',
      });
    } catch (error) {
      res.status(400).json({
        message: 'failed',
      });
    }
  },
  delete: async (req, res) => {
    try {
      await JobModel.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: 'success to delete',
      });
    } catch (error) {
      res.status(400).json({
        message: 'failed',
      });
    }
  },
};
