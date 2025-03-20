const Student=require('../models/student.model');
const validateStudent=require('../utils/studentvalidation');
const validateRegNo=require('../utils/regNovalidation');
const createStudent=async(req,res)=>{
  try {
    const { error } = validateStudent(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    const existingStudent = await Student.findOne({ regNo: req.body.regNo });
    if (existingStudent) {
      return res.status(400).json({ error: "Registration number already exists" });
    }
    const rollCheck = await Student.findOne({ class: req.body.class, rollNo: req.body.rollNo });
    if (rollCheck) {
      return res.status(400).json({ error: "Roll number already exists in this class" });
    }
    const student = new Student(req.body);
    await student.save();

    res.status(201).json({ message: "Student created successfully", student });
     
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllStudents=async(req,res)=>{
   try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip=(page-1)*limit;


    const sortBy=req.query.sortBy || 'name';
    const sortOrder=req.query.sortOrder === 'asc' ? 1 : -1;

    const students=await Student.find()
    .sort({[sortBy]:sortOrder})
    .skip(skip)
    .limit(limit);
  
    const totalStudents = await Student.countDocuments();
   

    res.status(200).json({
      students,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalStudents / limit),
        totalStudents,
        hasNextPage: skip + students.length < totalStudents,
      },
    });
    
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
}

const getStudentByRegNo=async(req,res)=>{
  try {
    const { regNo } = req.params;

    const {error}=validateRegNo.validate({ regNo });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ success: true, student });
 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateStudent=async(req,res)=>{
   try {
    const { regNo } = req.params;
    const {error}=validateRegNo.validate({ regNo });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
     let student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const { error: validationError } = validateStudent(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError.details.map(err => err.message) });
    }
    student = await Student.findOneAndUpdate({ regNo }, req.body, { new: true, runValidators: true });

    res.status(200).json({ message: "Student updated successfully", student });

   } catch (error) {
    res.status(500).json({ error: error.message });
   }
}

const deleteStudent=async(req,res)=>{
    try {
      const { regNo } = req.params;

 
    const { error } = validateRegNo.validate({ regNo });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    student.status = false;
    await student.save();

    res.status(200).json({  message: "Student deactivated successfully", student });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports={createStudent,getAllStudents,getStudentByRegNo,updateStudent,deleteStudent}
