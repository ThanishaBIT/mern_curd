// Import the libraries - express - mongoose - cors

const express = require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const cors=require("cors");

//Create Express Server

const app=express();
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://mern-curd-1-lhhz.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);




app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Create a Model

const Person = mongoose.model("Person",{name:String,age:Number},"person");

// Read all the peoples
app.get("/",async(req,res)=>{
    const people=await Person.find();
    res.json(people);
})
//Add new peoples
app.post("/",async(req,res)=>{

    const newPerson = await Person.create(req.body);
    res.json(newPerson);
})
//update people
app.put("/:id",async(req,res)=>{
    const updates =await Person.findByIdAndUpdate(req.params.id,req.body,  {new:true});
   res.json(updates);
})
//delete the people
app.delete("/:id",async(req,res)=>
{
    await Person.findByIdAndDelete(req.params.id);
    res.json({message:"person Deleted"});
})
const PORT=process.env.PORT ||4000;
//Connection
app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:4000")
})