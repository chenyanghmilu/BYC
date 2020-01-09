var Coach = require("../models/coach");
var Comment = require("../models/comment");

// COMMENTS NEW
function newComment(req, res) {
    Coach.findById(req.params.id, function (err, coach) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/coachNew", { coach: coach });
        }
    });
};

// COMMENTS CREATE
function create(req, res) {
    Coach.findById(req.params.id, function (err, coach) {
        if (err) {
            console.log(err);
            res.redirect("/coaches");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                coach.comments.push(comment);
                coach.save();
                req.flash("success", "Added Comment successfully!");
                res.redirect("/coaches/" + coach._id);
            });
        }
    });

};

//COMMENT EDIT
function edit(req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("comments/coachEdit", { coach_id: req.params.id, comment: comment });
        }
    });
};

//COMMENT UPDATE
function update(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, comment) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.redirect("/coaches/" + req.params.id);
        }
    });
};

// COMMENT DELETE
function deleteComment(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted successfully");
            res.redirect("/coaches/" + req.params.id);
        }
    });
};



module.exports = {
    new: newComment,
    create,
    edit,
    update,
    delete: deleteComment
};