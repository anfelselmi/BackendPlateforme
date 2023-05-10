const CompanyModel = require('../models/companyModel');
const Joi = require('joi');
require('dotenv').config();

const schema = Joi.object({
  address: Joi.string().label('address').required(),
  siteWeb: Joi.string().label('siteWeb').required(),
  speciality: Joi.string().label('speciality').required(),
  companyName: Joi.string().label('companyName').required(),
  phone: Joi.string().label('phone').required(),
  email: Joi.string().email().required(),
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
      CompanyModel.findOne({ email }, function (err, user) {
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
          const newcampany = new CompanyModel(req.body);

          newcampany.save((err, campany) => {
            if (err)
              return res.status(500).json({ msg: err.message, error: true });
            else {
              return res
                .status(200)
                .json({ isAuthenticated: true, error: false });
            }
          });
        }
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const listCompany = await CompanyModel.find();
      res.status(200).json({
        message: 'success',
        data: listCompany,
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
      });
    }
  },
  getById: async (req, res) => {
    try {
      const listById = await CompanyModel.findById({ _id: req.params.id });
      res.status(200).json({
        message: 'list of Company by Id',
        data: listById,
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
      });
    }
  },
  update: async (req, res) => {
    try {
      await CompanyModel.updateOne({ _id: req.params.id }, req.body, {
        new: true,
      });
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
      await CompanyModel.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: 'success to delete',
      });
    } catch (error) {
      res.status(400).json({
        message: 'failed to delete',
      });
    }
  },
};
