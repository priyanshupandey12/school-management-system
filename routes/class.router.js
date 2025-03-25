const express=require('express');
const router=express.Router();
const {createClass,getAllClasses,updateClass,getClassById}=require('../controllers/class.controller');


router.route('/').get(getAllClasses);
router.route('/create').post(createClass);
router.route('/:classId').patch(updateClass)
router.route('/:classId').get(getClassById)

module.exports=router