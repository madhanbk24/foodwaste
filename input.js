const express=require('express');
const Joi=require('joi');

const app=express();
app.use(express.json());
const course=[
    {id:1,name:'a'},
    {id:2,name:'ab'},
    {id:3,name:'abc'}
];
app.get('/',(req,res)=>{
    res.send("yes")
})
app.get('/display',(req,res)=>{
    res.send(course)
})
app.put('/course/:id',(req,res)=>{
    //404 error
    let course_value =course.find(m=>m.id==parseInt(req.params.id))
    if(!course_value)res.status(404).send("not found");
   // res.send(course_value)
 course_value.name=req.body.name;

 res.send(course)

})
app.delete('/delete/:id',(req,res)=>{
    let course_value =course.find(m=>m.id==parseInt(req.params.id))
    if(!course_value)res.status(404).send("not found");
   // res.send(course_value)
   const index=course.indexOf(course_value)
 course.splice(index,1);
 res.send(course)

})
app.listen(3000);