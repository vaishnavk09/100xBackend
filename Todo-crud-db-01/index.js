const express = require("express")
const jwt = require("jsonwebtoken")

const {auth, JWT_SECRET} = require("./auth")
const {UserModel, TodosModel} = require("./db")
const  mongoose = require("mongoose")
const app = express()
app.use(express.json())
mongoose.connect("mongodb+srv://vaishnavk9420:pqRoDAeg9TQWonyU@zencluster.314lae1.mongodb.net/todo-app-db")

app.post('/signup',async (req,res)=>{
const name = req.body.name
const email = req.body.email
const password = req.body.password


await UserModel.create({
    name: name,
    email: email,
    password: password

})
res.json({message: "user signed up successfully"

})
})

app.post('/signin', async(req,res)=>{
const {email, password} = req.body

const response= await UserModel.findOne({
    email:email,
    password:password,


})
if(response)
{
    const token =jwt.sign({
        id:response._id.toString(),
        email:response.email
    },JWT_SECRET)
    res.json({token:token})
}
else{
    res.status(401).json({message: "invalid credentials"})
}




})

app.post('/todo',auth,(req,res)=>{

})

app.get('/todos',auth,(req,res)=>{

})














app.listen(3000,()=>{
    console.log("server running on http://localhost:3000");
    
})