var express = require("express");
var router = express.Router({ mergeParams: true });
var commentCtrl = require("../controllers/coachComments");
var middleware = require("../controllers/middlewares");

// COMMENTS NEW
router.get('/coachNew', middleware.isLoggedIn, commentCtrl.new);
// COMMENTS CREATE
router.post('/', middleware.isLoggedIn, commentCtrl.create);
// COMMENT EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, commentCtrl.edit);
// COMMENT UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, commentCtrl.update);
// COMMENT DELETE
router.delete('/:comment_id', middleware.checkCommentOwnership, commentCtrl.delete);

module.exports = router;