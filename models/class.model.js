const mongoose=require('mongoose');

const classSchema=new mongoose.Schema({
   className:{
    type:String,
    required:true
   },
  classteacher:{
    type:String,
    required:true
   },
   studentId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student",
    required:true
   }],
   AcademicYear:{
    type:String,
    required:true
   }
},{timestamps:true})

const Class=mongoose.model("Class",classSchema);

module.exports=Class;