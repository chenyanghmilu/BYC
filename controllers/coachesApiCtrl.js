const Coach = require('../models/coach');

const index = function(req, res) {
    Coach.find({})
        .then(coachs => {
            res.status(200).json(coachs);
        });
};

const show = function(req, res) {
    Coach.findById(req.params.id)
        .then(coach => {
            if (coach) {
                res.status(200).json(coach);
            } else {
                res.status(404).json({ error: 'Coach not found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

const create = function(req, res) {
    Coach.create(req.body)
        .then(coach => {
            res.json(coach);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

const update = function(req, res) {
    Coach.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(coach => {
            if (Coach) {
                res.status(200).json(coach);
            } else {
                res.status(404).json({ error: 'coach not found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

const deleteCoach = function(req, res) {
    Coach.findByIdAndDelete(req.params.id)
        .then(coach => {
            res.json({ coach, message: 'Successfully deleted Coach' });
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
    delete: deleteCoach
};