const AdminModel = require('../models/adminModel');
require('dotenv').config();
const Joi = require('joi');
const schema = Joi.object({
  address: Joi.string().label('address').required(),
  phone: Joi.string().label('phone').required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

module.exports = {
  register: function (req, res) {
    const { email } = req.body;

    const { error } = schema.validate(req.body);
    console.log(req.body);
    if (error) {
      return res.status(400).send({
        [error.details[0].context.label]: error.details[0].message,
      });
    } else {
      AdminModel.findOne({ email }, function (err, user) {
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
          const newadmin = new AdminModel(req.body);

          newadmin.save((err, admin) => {
            if (err)
              return res.status(500).json({ msg: err.message, error: true });
            else {
              return res.status(200).json({ admin: admin, error: false });
            }
          });
        }
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const Admin = await AdminModel.find();
      res.status(200).json({
        message: 'success',
        data: Admin,
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
      });
    }
  },
  getById: async (req, res) => {
    try {
      const adminById = await AdminModel.findById({ _id: req.params.id });
      res.status(200).json({
        message: 'success',
        data: adminById,
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
      });
    }
  },
  update: async (req, res) => {
    try {
      await AdminModel.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json({
        message: 'success',
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
      });
    }
  },
  delete: async (req, res) => {
    try {
      await AdminModel.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: 'success',
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
      });
    }
  },
};
