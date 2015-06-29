/**
 * Created by Carlos on 28/6/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');


/**
 * Show the current User
 */
exports.read = function(req, res) {
    res.jsonp(req.user);
};

/**
 * List of Users
 */
exports.list = function(req, res) {
    User.find().exec(function(err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(users);
        }
    });
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
    User.findById(id).exec(function(err, user) {
        if (err) return next(err);
        if (! user) return next(new Error('Failed to load User ' + id));
        req.user = user ;
        next();
    });
};



