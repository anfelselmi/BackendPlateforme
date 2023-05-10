const candidateModel = require('../models/candidateModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');
const userModel = require('../models/userModel');
const schema = Joi.object({
  fullName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

module.exports = {
  register: function (req, res) {
    const { email, password, role } = req.body;
    const { error } = schema.validate(req.body);
    console.log(req.body);
    if (error) {
      return res.status(400).send({
        [error.details[0].context.label]: error.details[0].message,
      });
    } else {
      candidateModel.findOne({ email }, function (err, user) {
        if (err) return res.status(500).json({ msg: err.message, error: true });
        if (user)
          return res.status(422).json({
            message: 'user with this email is already exist!',
            errors: {
              details: [
                {
                  path: ['email'],
                  message: ['email déja utilisé'],
                },
              ],
            },
          });
        else {
          const newcondidat = new candidateModel(req.body);

          newcondidat.save((err, condidat) => {
            if (err)
              return res.status(500).json({ msg: err.message, error: true });
            else {
              return res.status(200).json({ condidat: condidat, error: false });
            }
          });
        }
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const Listcandidate = await candidateModel.find();
      res.status(200).json({
        message: 'List Candidate',
        data: Listcandidate,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },
  getById: async (req, res) => {
    try {
      listCandidateById = await candidateModel.findById({ _id: req.params.id });
      res.status(200).json({
        message: 'success',
        data: listCandidateById,
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
      });
    }
  },

  deleteCondidatById: function (req, res) {
    candidateModel.findByIdAndDelete(
      { _id: req.params.id },
      (err, Condidat) => {
        if (err) {
          res.json({
            message: 'error delete  one Condidat' + err,
            data: null,
            status: 500,
          });
        } else {
          res.json({
            message: 'one Condidat delete system',
            data: Condidat,
            status: 200,
          });
        }
      }
    );
  },

  updateCondidatById: async (req, res) => {
    try {
      user = await candidateModel.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      res.json({
        message: 'error update  user by id ' + err,
        data: null,
        status: 500,
      });
    } catch (error) {
      res.json({
        message: 'user updated successufly',
        data: user,
        status: 200,
      });
    }
  },
};
