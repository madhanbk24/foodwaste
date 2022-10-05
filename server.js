const express = require('express');
const path = require('path');
var mysql = require('mysql');
const app = express();
const Nexmo=require('nexmo');
const nexmo=new Nexmo({
    apiKey:'6b106d46',
    apiSecret:'NETxWvRypiN64ReY',
});
var connection=mysql.createConnection({
  host:'localhost',
  database:'webdev',
  user:'root',
  password:'Madhanbk@7853'})

const bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({ extended: true })); 


// sendFile will go here
app.get('/', function(req, res) {
  
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/volunteer', function(req, res) {
  res.sendFile(path.join(__dirname, '/volunteer.htm'));
});
app.get('/volunteer2', function(req, res) {
  res.sendFile(path.join(__dirname, '/volunteer2.html'));
});
app.get('/donator', function(req, res) {
  res.sendFile(path.join(__dirname, '/donator.htm'));
});
app.get('/donator2', function(req, res) {
  res.sendFile(path.join(__dirname, '/donator2.html'));
});
app.post('/donate',(req,res)=>{
   
  

  res.redirect('http://localhost:8080/donator')

});
app.post('/volunteer2',(req,res)=>{
   

var sql=`insert into volunteer values("${req.body.name} ","${req.body.mobile}","${req.body.lat}","${req.body.lon}","${req.body.type}","${req.body.personeat}")`
connection.query(sql)
var del='delete from volunteer where name="go" ';
var fetch='select * from volunteer';
var fetch2='select name,mobile,doname,domobile,dopersoneat,dolat,dolon from volunteer inner join donator on (donator.type=volunteer.type) ||(donator.type!=volunteer.type)  where (ST_Distance_Sphere(point(lon,lat),point(dolon,dolat))/1000)<50   order by (ST_Distance_Sphere(point(lon,lat),point(dolon,dolat))/1000) asc ';
connection.query(fetch2,function(err,result,fields){
  if (err)  throw err;
 // res.send(result[0]);
 
 const from="Vonage APIs";
 const to='+919025050140';
 const text=`'We have the extra food  contact ${result[0].domobile} it can be eat by ${result[0].dopersoneat} location:https://www.google.com/maps/search/?api=1&query=${result[0].dolat},${result[0].dolon}'`;
 nexmo.message.sendSms(from,to,text,function(error,result)
  {
   if (error) console.log(error);
   else{
   console.log(result);
    
   }
 });

 connection.query(`delete  from donator where domobile=${result[0].domobile}`,function(err,result,fields){
  if (err)  throw err;
  else{
  console.log(result);}
});
 
connection.query(`delete  from volunteer where mobile=${result[0].mobile}`,function(err,result2,fields){
  if (err)  throw err;
  else{
  console.log(result2);}
});
 
});

  res.redirect('http://localhost:8080/volunteer2')
  

});
app.post('/',(req,res)=>{
   
  

  res.redirect('http://localhost:8080/')

});
app.post('/donate2',(req,res)=>{
   
  //res.send(req.body);
  var sql=`insert into donator values("${req.body.name} ","${req.body.mobile}","${req.body.personcaneat}","${req.body.lat}","${req.body.lon}","${req.body.type}","${req.body.purpose}")`
  connection.query(sql)
//  
   


 res.redirect('http://localhost:8080/donator2')

});
app.post('/volunteer',(req,res)=>{
   
 // res.send('hello');
  // res.redirect('back');
 // res.sendFile(path.join(__dirname, '/index.html'));

  res.redirect('http://localhost:8080/volunteer')

});










app.listen(8080);
console.log('Server started at http://localhost:' +8080);