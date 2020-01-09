var Course = require("../models/course");
var Comment = require("../models/comment");

// COMMENTS NEW
function newComment(req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/new", { course: course });
        }
    });
};

// COMMENTS CREATE
function create(req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (err) {
            console.log(err);
            res.redirect("/courses");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                course.comments.push(comment);
                course.save();
                req.flash("success", "Added Comment successfully!");
                res.redirect("/courses/" + course._id);
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
            res.render("comments/edit", { course_id: req.params.id, comment: comment });
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
            res.redirect("/courses/" + req.params.id);
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
            res.redirect("/courses/" + req.params.id);
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