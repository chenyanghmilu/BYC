var Coach = require('../models/coach');
// var Course = require('../models/course');

module.exports = {
    index,
    show,
    new: newCoach,
    create,
    edit,
    update,
    delete: deleteCoach
};

function index(req, res) {
    Coach.find({}, function (err, coaches) {
        if (err) {
            console.log(err);
        } else {
            res.render('coaches/index', { coaches: coaches });
        }
    });
};

function show(req, res) {
    Coach.findById(req.params.id).populate('comments').exec(function (err, foundCoach) {
        if (err)
            console.log(err);
        else {
            console.log(foundCoach);
            res.render('coaches/show', { coach: foundCoach });
        }
    });
};

function newCoach(req, res) {
    res.render('coaches/new');
};

function create(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcoach = req.body.coach;
    newcoach.author = author;
    Coach.create(newcoach, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/coaches');
        }
    });
};

function edit(req, res) {
    Coach.findById(req.params.id, function (err, foundCoach) {
        if (err) {
            res.redirect('back');
        } else {
            res.render('coaches/edit', { coach: foundCoach });
        }
    });
};

function update(req, res) {
    Coach.findByIdAndUpdate(req.params.id, req.body.coach, function (err, updatedCoach) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/coaches/' + updatedCoach._id);
        }

    });
};


// function addToTutor(req, res) {
//   Course.findById(req.params.id, function(err, course) {
//     course.tutor.push(req.body.coachId);
//     course.save(function(err) {
//       res.redirect(`/courses/${course._id}`);
//     });
//   });
// }

function deleteCoach(req, res) {
    Coach.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/coaches');
        } else {
            res.redirect('/coaches');
        }
    });
};