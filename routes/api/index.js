const express = require('express');
const router = express.Router();

const coursesRouter = require('./courses');
const coachRouter = require('./coaches');
const recipesRouter = require('./recipes');

router.use('/courses', coursesRouter);
router.use('/coaches', coachRouter);
router.use('/recipes', recipesRouter);

module.exports = router;