var Course = require('../models/course');


module.exports = {
    index,
    show,
    new: newCourse,
    create,
    edit,
    update,
    delete: deleteCourse
};

function index(req, res) {
    Course.find({}, function (err, courses) {
        if (err) {
            console.log(err);
        } else {
            res.render('courses/index', { courses: courses });
        }
    });
    //   console.log(req.user);
};

function show(req, res) {
    Course.findById(req.params.id).populate('comments').exec(function (err, foundCourse) {
        if (err)
            console.log(err);

        else {
            console.log(foundCourse);
            res.render('courses/show', { course: foundCourse });
        }
    });
};

function newCourse(req, res) {
    res.render('courses/new');
}


function create(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcourse = req.body.course;
    newcourse.author = author;
    Course.create(newcourse, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/courses');
        }
    });
};

function edit(req, res) {
    Course.findById(req.params.id, function (err, foundCourse) {
        if (err) {
            res.redirect('back');
        } else {
            res.render('courses/edit', { course: foundCourse });
        }

    });
};

function update(req, res) {
    Course.findByIdAndUpdate(req.params.id, req.body.course, function (err, updatedCourse) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/courses/' + updatedCourse._id);
        }

    });
};

function deleteCourse(req, res) {
    Course.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/courses');
        } else {
            res.redirect('/courses');
        }
    });
};