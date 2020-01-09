var Course = require("../models/course");
var Comment = require("../models/comment");
var Coach = require('../models/coach');

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.redirectTo = req.originalUrl;
    req.flash("error", "You're not logged in!");
    res.redirect("/login");
}

middlewareObj.checkCourseOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Course.findById(req.params.id, function (err, foundCourse) {
            if (err) {
                req.flash("error", "Course not found!");
                res.redirect("back");
            } else {
                if (foundCourse.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });

    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCoachOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Coach.findById(req.params.id, function (err, foundCoach) {
            if (err) {
                req.flash("error", "Ccoach not found!");
                res.redirect("back");
            } else {
                if (foundCoach.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });

    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });

    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

module.exports = middlewareObj;