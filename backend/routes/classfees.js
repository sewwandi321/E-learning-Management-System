const router=require("express").Router();
const { requireSignin,sellermiddleware } = require('../middleware/index')
const {addcategory,getcategory}=require('../controller/classfees') 
const {createclassfees,getfeesbyid,getall,updateclassfees,deleteById ,getfeesbyfeesid ,getclass,getfeesbymonth} = require('../controller/classfees');
const multer = require('multer');
const shortid = require('shortid')
const path = require('path');




router.post('/classfees/create',createclassfees);
router.get('/classfees/viewall',getall);
router.put('/classfees/edit/:_id',updateclassfees);
router.delete('/classfees/del/:_id',deleteById);
router.get('/classfees/:feesId',getfeesbyid);
router.post('/classfees/sech',getfeesbyfeesid);
router.get('/classfees/getclass/:id',getclass);
router.get('/classfees/getclassinmonth/:month',getfeesbymonth);


 module.exports = router;  