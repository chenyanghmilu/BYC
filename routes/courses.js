var express = require('express');
var router = express.Router();
var coursesCtrl = require('../controllers/courses');
var middleware = require("../controllers/middlewares");

router.get('/', coursesCtrl.index);

router.post('/', middleware.isLoggedIn, coursesCtrl.create);

router.get('/new', middleware.isLoggedIn, coursesCtrl.new);

router.get('/:id', coursesCtrl.show);

router.get('/:id/edit', middleware.checkCourseOwnership, coursesCtrl.edit);

router.put('/:id', middleware.checkCourseOwnership, coursesCtrl.update);

router.delete('/:id', middleware.checkCourseOwnership, coursesCtrl.delete);

module.exports = router;
