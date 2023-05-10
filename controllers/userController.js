const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
function signToken(userID) {
  return jwt.sign(
    {
      iss: 'moonServer',
      sub: userID,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
}

const Joi = require('joi');
const { join } = require('path');
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  login: function (req, res) {
    const { error } = schema.validate(req.body);
    console.log(req.body);
    if (error) {
      return res.status(400).send({
        [error.details[0].context.label]: error.details[0].message,
      });
    } else {
      const { _id, email } = req.user;
      userModel
        .findById({ _id: _id })

        .exec((err, user) => {
          if (!err) {
            const token = signToken(_id);

            res.cookie('access_token', token, {
              maxAge: 3600 * 1000,
              httpOnly: true,
              sameSite: true,
            });

            return res
              .status(200)
              .json({
                isAuthenticated: true,
                user: { email },
                role: req.user.__t,
                token,
              });
          }
        });
    }
  },

  logout: (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({
      isconnected: false,
      message: 'succesffully logged out',
    });
  },

  authenticated: (req, res) => {
    const {
      email,
      _id,
      phone,
      address,
      companyName,
      avatar,
      siteWeb,
      fullName,
      lastName,
      speciality,
      password,
    } = req.user;
    userModel.findById({ _id: _id }).exec((err, user) => {
      if (!err) {
        return res
          .status(200)
          .json({
            isAuthenticated: true,
            user: {
              email,
              _id,
              phone,
              avatar,
              address,
              companyName,
              fullName,
              lastName,
              speciality,
              password,
              siteWeb,
            },
            role: user.__t,
          });
      }
    });
  },

  getAllUsers: function (req, res) {
    userModel.find({}, (err, users) => {
      if (err) {
        res.json({
          message: 'error get all users' + err,
          data: null,
          status: 500,
        });
      } else {
        res.json({
          message: 'all users in system',
          size: users.length,
          data: users,
          status: 200,
        });
      }
    });
  },

  getUserById: function (req, res) {
    userModel
      .findById({ _id: req.params.id })

      .exec((err, user) => {
        if (err) {
          res.json({
            message: 'error get one user' + err,
            data: null,
            status: 500,
          });
        } else {
          res.json({ message: ' user in system', data: user, status: 200 });
        }
      });
  },

  deleteUserById: function (req, res) {
    userModel.findByIdAndDelete({ _id: req.params.id }, (err, User) => {
      if (err) {
        res.json({
          message: 'error delete  one User' + err,
          data: null,
          status: 500,
        });
      } else {
        res.json({
          message: 'one User delete system',
          data: User,
          status: 200,
        });
      }
    });
  },

  updateUser: async (req, res) => {
    try {
      user = await userModel.findByIdAndUpdate(
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

  uploadavatar: (req, res) => {
    //let avatar= req.file.filename;
    const avatar = {
      avatar: req.file.filename, //  filename: Le nom du fichier dans le destination
    };
    console.log('fiiiiiiilllleee', req.file);
    //console.log('params', req.params);

    if (
      req.file.mimetype == 'image/jpg' ||
      req.file.mimetype == 'image/png' ||
      req.file.mimetype == 'image/jpeg'
    ) {
      userModel.findByIdAndUpdate(
        { _id: req.params.id },
        avatar,
        (err, user) => {
          if (err) {
            res.status(500).json({ message: 'avatar not uploaded' });
          } else {
            userModel.findById({ _id: user.id }, (err, user) => {
              if (err) {
                res.json('error');
              } else {
                res.status(200).json({
                  message: 'user updated',
                  data: user,
                });
              }
            });
          }
        }
      );
    } else {
      res.json({ msg: 'please enter a valid extention' });
    }
  },
};
