// Import the libraries - express - mongoose - cors

const express = require("express");
const mongoose=require("mongoose");
const cors=require("cors");

//Create Express Server

const app=express();
app.use(cors());



app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://thanishact23_db_user:qZxQTjkhTSs265CT@cluster0.1xliwcl.mongodb.net/?appName=Cluster0")
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

//Connection
app.listen(5000,()=>{
    console.log("Server is running on http://localhost:5000")
})