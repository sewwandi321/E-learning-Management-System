const router=require("express").Router();
const { requireSignin,sellermiddleware } = require('../middleware/index')
const {createsalary,getSalary,getall,updateSalary,deleteById ,getSalarybysalaryid} = require('../controller/salary');
const multer = require('multer');
const shortid = require('shortid')
const path = require('path');





router.post('/salary/create',createsalary);
router.get('/salary/viewall',getall);
router.put('/salary/edit/:_id',updateSalary);
router.delete('/salary/del/:_id',deleteById);
router.post('/salary/sech',getSalarybysalaryid);

 module.exports = router;  