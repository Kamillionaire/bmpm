"use strict";
var express = require("express");
var Boxers_1 = require("./../models/Boxers");
var router = express.Router();
router.get('/boxers', function (req, res, next) {
    Boxers_1.default.find({}, {}, function (e, data) {
        if (e)
            return res.status(500);
        res.json(data);
    });
});
router.post('/boxers', function (req, res, next) {
    Boxers_1.default.create(req.body, function (e, data) {
        if (e)
            return res.status(500);
        res.json(data);
    });
});
router.put('/boxers/:id', function (req, res, next) {
    Boxers_1.default.update({ _id: req.params.id }, req.body, {}, function (e, data) {
        if (e)
            return res.status(500);
        res.json(data);
    });
});
module.exports = router;
