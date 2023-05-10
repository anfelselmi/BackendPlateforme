const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../middleware/passport');
const upload = require('../middleware/upload')
const userController = require('../controllers/userController')
const LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;

Route.post("/login", passport.authenticate('local', { session: false }), userController.login)
Route.get("/logout", passport.authenticate('jwt', { session: false }), userController.logout)
Route.get('/allUser', userController.getAllUsers) 
Route.get('/getUserbyid/:id', passport.authenticate('jwt', { session: false }), userController.getUserById)
Route.delete('/deleteUserbyid/:id',  userController.deleteUserById)
Route.put('/avatar/:id',upload.single("avatar"),userController.uploadavatar);
Route.put('/update/:id', userController.updateUser)
Route.get("/authenticated", passport.authenticate('jwt', { session: false }), userController.authenticated)
module.exports = Route;