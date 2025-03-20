const express= require('express');
const router=express.Router();
const {createStudent,getAllStudents,getStudentByRegNo,updateStudent,deleteStudent}=require('../controllers/student.controller');


router.route('/').get(getAllStudents);
router.route('/create').post(createStudent);
router.route('/:regNo').get(getStudentByRegNo);
router.route('/:regNo').put(updateStudent);
router.route('/:regNo').delete(deleteStudent);



module.exports=router;