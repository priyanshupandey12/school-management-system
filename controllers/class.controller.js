const Class=require('../models/class.model');


const createClass=async(req,res)=>{
    try {
        const {className,classteacher,AcademicYear,StudentId}=req.body;
    
       
        if(!className || !classteacher || !AcademicYear) {
               return res.status(402).json({message:"All the fields are required"});
        }
        
        const newClass=await Class.create({
          className,
          classteacher,
          AcademicYear,
          studentId:StudentId
        });

        if(!newClass) {
          return res.status(402).json({message:"Class is not created"});
        }

        return res.status(201).json({message:"Class is Created",newClass})

    } catch (error) {
       console.log(error)
       return res.status(500).json({message:"Internal server error"})
    }
}

const getAllClasses=async(req,res)=>{
  try {
    const classes=await Class.find({}).populate('studentId');

    if(!classes) {
      return res.status(401).json({message:"classes are not found"});
    }

    return res.status(200).json({message:"All Classes",classes})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
  }
}

const updateClass=async(req,res)=>{
  try {
     const {classId}=req.params;
     const { studentId } = req.body;
     if(!classId) {
      return res.status(401).json({message:"All fields are required"});
     }
     const updatedClass=await Class.findByIdAndUpdate(
      classId,
 
      {$addToSet:{studentId:{$each:Array.isArray(studentId)?studentId:[studentId]}}},
      {new:true}
     );
   
     if(!updatedClass) {
        return res.status(401).json({message:"class is not updated"});
     }

     return res.status(201).json({message:"updated classes",updatedClass});
  } catch (error) {
     console.log(error);
     return res.status(500).json({message:"Internal server error"});
  }
}

const getClassById=async(req,res)=>{
    try {
       const {classId}=req.params;
       if(!classId) {
        return res.status(400).json({message:"classId is required"});
       }
       const getclass=await Class.findById(classId).populate('studentId')

       return res.status(200).json({message:"fetched sucessuflly",getclass})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Internal server error"});
    }
}






module.exports={createClass,getAllClasses,updateClass,getClassById}