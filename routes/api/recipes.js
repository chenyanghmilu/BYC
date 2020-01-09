const express = require('express');
const router = express.Router();

const recipesApiCtrl = require('../../controllers/recipesApiCtrl');

router.get('/', recipesApiCtrl.index);

module.exports = router;