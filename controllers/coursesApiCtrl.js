const Course = require('../models/course');

const index = function (req, res) {
    Course.find({})
        .populate('comments')
        .then(courses => {
            res.status(200).json(courses);
        });
};

const show = function(req, res) {
    Course.findById(req.params.id)
        .populate('comments')
        .then(course => {
            if (course) {
                res.status(200).json(course);
            } else {
                res.status(404).json({ error: 'Course not found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

const create = function(req, res) {
    Course.create(req.body)
        .then(course => {
            res.json(course);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

const update = function(req, res) {
    Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(course => {
            if (course) {
                res.status(200).json(course);
            } else {
                res.status(404).json({ error: 'Course not found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

const deleteCourse = function(req, res) {
    Course.findByIdAndDelete(req.params.id)
        .then(course => {
            res.json({ course, message: 'Successfully deleted Course' });
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteCourse
};