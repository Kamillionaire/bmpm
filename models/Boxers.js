"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BoxerSchema = new Schema({
    name: String,
    age: Number,
    weight: Number
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Boxer', BoxerSchema);
