var express = require('express');
var router = express.Router();
var coachesCtrl = require('../controllers/coaches');
var middleware = require("../controllers/middlewares");

router.get('/', coachesCtrl.index);

router.post('/', middleware.isLoggedIn, coachesCtrl.create);

router.get('/new', middleware.isLoggedIn, coachesCtrl.new);

router.get('/:id', coachesCtrl.show);

router.get('/:id/edit', middleware.checkCoachOwnership, coachesCtrl.edit);

router.put('/:id', middleware.checkCoachOwnership, coachesCtrl.update);

// router.post('/:id/coaches', coachesCtrl.addToTutor);

router.delete('/:id', middleware.checkCoachOwnership, coachesCtrl.delete);

module.exports = router;
