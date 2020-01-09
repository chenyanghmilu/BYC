const express = require('express');
const router = express.Router();

const coursesApiCtrl = require('../../controllers/coursesApiCtrl');

router.get('/', coursesApiCtrl.index);

router.post('/', coursesApiCtrl.create);

router.get('/:id', coursesApiCtrl.show);

router.put('/:id', coursesApiCtrl.update);

router.delete('/:id', coursesApiCtrl.delete);

module.exports = router;