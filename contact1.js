var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wedding');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var Name = req.body.name;
    var Email = req.body.email;
    var Message =req.body.message;
    var data = {
        "Name": Name,
        "Email":Email,
        "Message":Message,
    }
db.collection('wed1').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
    return res.redirect('contact.html')
})
app.listen(4000);
console.log("server listening at port 3000");
