import * as express from 'express';
import * as passport from 'passport';
let router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/login/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: true, failureRedirect: '/', successRedirect: '/'}));
export = router;
