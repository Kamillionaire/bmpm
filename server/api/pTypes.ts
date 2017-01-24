import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import Users from '../models/Users';
import {PType} from '../models/PTypes';

let router = express.Router();
//get all
//TODO paginated
router.get('/ptypes', (req, res, next) => {
    PType.find({}, {}, (e, data) => {
        if (e) return next({ message: 'Could Not Find Personality Type', Error: e });
        res.json(data);
    });
});
router.get('/ptypes/:id', (req, res, next) => {
    PType.findOne({_id:req.params.id}, {}, (e, data) => {
        if (e) return next({ message: 'Could Not Find Personality Type', Error: e });
        res.json(data);
    });
});
//new
router.post('/ptypes', (req, res, next) => {
    PType.create(req.body, (e, data) => {
        if (e) return next({ message: 'Could Not Find Personality Type', Error: e });
        res.json(data);
    })
});
router.delete('/ptypes/:id', (req, res, next) => {
    PType.remove({_id:req.params.id}, (e) => {
        if (e) return next({ message: 'Could Not Find Personality Type', Error: e });
        res.json({});
    })
});
//update
router.put('/ptypes/:id', (req, res, next) => {
    PType.update(
        { _id: req.params.id },
        req.body,
        {},
        (e, data) => {
            if (e) return next({ message: 'Could Not Find Movies', Error: e });
            res.json(data);
        });
});

export = router;
