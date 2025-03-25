const express=require('express');
const app=express();
require('dotenv').config();
const connectDB=require('./config/database');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const studentRouter=require('./routes/student.router')
const classRouter=require('./routes/class.router');

app.use('/api/v1/students',studentRouter)
app.use('/api/v1/classes',classRouter);


connectDB().then(()=>{
  app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`));
}).catch(err=>console.log(err));
