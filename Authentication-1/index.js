const express = require('express')
const jwt =require('jsonwebtoken')
const app=express()

app.use(express.json())
const JWT_SECRET ="random secret key hai bhai ye"
const users=[]

app.post('/signup',(req,res)=>{
    const username=req.body.username
    const password=req.body.password
   
    users.push({
        username: username,
        password: password
    })
    res.json({message:"user signed up success!"})
})
    
    

app.post('/signin',(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const user=users.find((user)=>user.username===username && user.password===password)
    if(user){
        const token=jwt.sign({username},JWT_SECRET)
        res.json({token})
    }

    else{
        res.status(403).json({message:"invalid username or password"})
    }
})

const auth =(req,res,next)=>{
    const token =req.headers.token
    const decodedInfo=jwt.verify(token,JWT_SECRET)
    if(decodedInfo.username){
        req.username=decodedInfo.username
        next()
    }
        else{
            res.status(401).json({message:"unauthorized access"})
        }
    
}
    

app.get("/me",auth,(req,res)=>{
  
    let foundUser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username===req.username){
            foundUser=users[i];
            break;
        }
    }
    if(foundUser){
        res.json({username:foundUser.username})
    }
    else{
        res.status(404).json({message:"user not found"})
    }

})








app.listen(3002,()=>{
    console.log("Authentication service is running on http://localhost:3002");
})