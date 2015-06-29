'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 5));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	email: {
		type: String,
		trim: true,
		default: '',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	displayName: {
		type: String,
		trim: true
	},
	username: {
		type: String,
		unique: 'Username already !!!!!',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	nric: {
		type: String,
		unique: 'You may only have one account per person',
		trim: true
	},
	mobileNo: {
		type: String,
		trim: true,
		default: '+65 '
	},
	dob: {
		type: String,
		trim: true
	},
	blockNo: {
		type: String,
		trim: true,
		default: ''
	},
	roadName: {
		type: String,
		trim: true,
		default: ''
	},
	unitNo: {
		type: String,
		trim: true,
		default: ''
	},
	qualification: {
		type: String,
		trim: true
	},
	commitment: {
		type: String,
		trim: true
	},
	location: {
		north: {
			type: Boolean,
			default: false
		},
		west: {
			type: Boolean,
			default: false
		},
		south: {
			type: Boolean,
			default: false
		},
		east: {
			type: Boolean,
			default: false
		},
		central: {
			type: Boolean,
			default: false
		},
		northeast: {
			type: Boolean,
			default: false
		}
	},
	niche: {
		_1: {
			type: Boolean,
			default: false
		},
		_2: {
			type: Boolean,
			default: false
		},
		_3: {
			type: Boolean,
			default: false
		},
		_4: {
			type: Boolean,
			default: false
		},
		_5: {
			type: Boolean,
			default: false
		},
		_6: {
			type: Boolean,
			default: false
		}
	},
	experience: {
		type: String,
		default: ''
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 5) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);
