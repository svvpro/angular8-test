const express = require('express');
const passport = require('passport');
const router = express.Router();
const upload = require('../middleware/uploads');
const categoryCtrl = require('../controllers/category');

router.get('/',  passport.authenticate('jwt', { session: false }), categoryCtrl.getAll);
router.get('/:id',  passport.authenticate('jwt', { session: false }), categoryCtrl.getById);
router.post('/',  passport.authenticate('jwt', { session: false }), upload.single('img'), categoryCtrl.add);
router.patch('/:id',  passport.authenticate('jwt', { session: false }), upload.single('img'), categoryCtrl.update);
router.delete('/:id',  passport.authenticate('jwt', { session: false }), categoryCtrl.delete);

module.exports = router;
