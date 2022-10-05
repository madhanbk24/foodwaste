const express=require('express');
const app=express();
app.use(express.json());
const course=[
    {id:1,name:'a'},
    {id:2,name:'ab'},
    {id:3,name:'abc'}
];
app.get('/',(req,res)=>{
   
    res.send('hwllo world');


});
app.get('/course',(req,res)=>{
    res.send([1,2,3])
})
// to get one values from multiple elements
app.get('/course/:id',(req,res)=>
{
    //res.send(req.params.id);
    let course_value =course.find(m=>m.id==parseInt(req.params.id))
    if(!course_value)res.status(404).send("not found");
    res.send(course_value)
})
//to get multiple elements to api id 
app.get('/post/:year/:name',(req,res)=>{
    res.send(req.params)
})
//post method
app.post('/post',(req,res)=>{
    const cour={
        id: course.length+1,
        name:req.body.name // enabel jspon to enable this
    };
    course.push(cour);
    res.send(course)
})
const port =process.env.PORT || 3100//if any value occur take that or else use 3100
app.listen(port)//in real time port may change so use port environment variabkes