const mongoose=require('mongoose');


const studentSchema=new mongoose.Schema({
  regNo: {
     type: String, 
     required: [true, 'Registration number is required'],
      unique: true 
    },
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      unique: true
    },
    class: { 
      type: String, 
      required: [true, 'Class is required'],
    },
    rollNo: { 
      type: Number, 
      required: [true, 'Roll number is required'],
    },
    contact: {
       type: String, 
       required: [true, 'Contact number is required'], 
      },
    status: { 
     type: Boolean, 
      default: true
        }

},{ timestamps: true })

const Student=mongoose.model('Student',studentSchema);

module.exports=Student