const UserModel = require('./userModel');
const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({});
UserModel.discriminator('Admin', adminSchema);
module.exports = mongoose.model('Admin');
