const express = require('express');
const router = express.Router();

const coachesApiCtrl = require('../../controllers/coachesApiCtrl');

router.get('/', coachesApiCtrl.index);

router.post('/', coachesApiCtrl.create);

router.get('/:id', coachesApiCtrl.show);

router.put('/:id', coachesApiCtrl.update);

router.delete('/:id', coachesApiCtrl.delete);

module.exports = router;