"use strict";
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Profile_1 = require("./../models/Profile");
let UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    state: { type: String, required: true },
    pType: { type: String, ref: 'PType', required: true },
    passwordHash: { type: String, select: false },
    salt: { type: String, select: false },
    facebookId: String,
    facebook: {
        token: String,
        name: String,
        email: String
    },
    roles: { type: Array, default: ['user'] }
});
UserSchema.pre('save', true, function (next, done) {
    if (this.isNew) {
        console.log('isNew');
        Profile_1.default.create().then(() => {
            next();
            done();
        }).catch((e) => {
            var err = new Error(e);
            next(err);
            done();
        });
    }
    else {
        next();
        done();
    }
});
UserSchema.method('setPassword', function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
});
UserSchema.method('validatePassword', function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return (hash === this.passwordHash);
});
UserSchema.method('generateJWT', function () {
    return jwt.sign({
        id: this._id.toString(),
        _id: this._id,
        username: this.username,
        email: this.email
    }, process.env.JWT_SECRET, { expiresIn: '2 days' });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model("User", UserSchema);
