const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

app.use(bodyParser.json())

const Employee = mongoose.model("employee")
const mongoUri ="mongodb+srv://abc:LTe4l17mzOxEoZIB@cluster0.qa1da.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongo successful")
})
mongoose.connection.on("error",(err)=>{
    console.log("error",err)
})

// Creating employee details -->
app.post('/send-data',(req,res)=>{
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position,
        bio:req.body.bio,
        education:req.body.education,
        project:req.body.project

    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

// Delete employee details  -->
app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{ 
        console.log(err)
    })
})

// updating employee details -->
app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position,
        bio:req.body.bio,
        education:req.body.education,
        project:req.body.project
        
    }).then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

//this will return all created employee'cv --> 
app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
    
})


app.get('/',(req,res)=>{
    res.send("Welcome to node js")
})
app.listen(3000,()=>{
    console.log("server running")
})