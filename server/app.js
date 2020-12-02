const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const mongoUri ="mongodb+srv://abc:LTe4l17mzOxEoZIB@cluster0.qa1da.mongodb.net/<dbname>?retryWrites=true&w=majority"


app.get('/',(req,res)=>{
    res.send("Welcome to node js")
})
app.listen(3000,()=>{
    console.log("server running")
})