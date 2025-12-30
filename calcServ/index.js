const express = require('express')
const app=express()
app.use(express.json())
const cors =require("cors")

app.use(cors)

app.use((req,res,next)=>{
    console.log(`${req.method} request made to ${req.url} at ${new Date()}`);
    res.locals.requestTime = new Date();
    next()
})


app.post('/square', (req, res, next) => {
    const num = Number(req.body.num)
    const sq = num * num
    res.json({ result: sq })
})
app.get('/add',(req,res)=>{
    const a =Number(req.query.a)
    const b=Number(req.query.b)
    const sum=a+b
    res.json({result:sum })
})

app.get('/subtract',(req,res)=>{
    const a =Number(req.query.a)
    const b=Number(req.query.b)
    const difference=a-b
    res.json({result:difference })
})

app.get('/multiply/:a/:b',(req,res)=>{
    const a =Number(req.params.a)
    const b=Number(req.params.b)
    const product=a*b
    res.json({result:product })

})

app.get('/divide',(req,res)=>{
    const a =Number(req.query.a)
    const b=Number(req.query.b) 
    if(b===0)
    {
        res.json({msg:"division by zero is not allowed"})
    }
    else{
        const quotient=a/b
        res.json({result:quotient })
    }
})









app.listen(5000,()=>{
    console.log("server is running on http://localhost:5000");
    
})