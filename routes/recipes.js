var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('recipes/index');
});

module.exports = router;