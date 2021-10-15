const router = require('express').Router();
const { requireSignin, sellermiddleware } = require('../middleware/index');

const {
    getall,
    createClass,
    getAllTeachers,
    deleteById,
    updateScheduleById,
} = require('../controller/Class');

const shortid = require('shortid');
const path = require('path');

router.post('/classschedule/create', createClass);
router.get('/classschedule/viewall', getall);
router.get('/classschedule/teachers', getAllTeachers);
router.delete('/classschedule/del/:_id', deleteById);
router.put('/classschedule/updateScheduleById/:_id', updateScheduleById);

module.exports = router;
