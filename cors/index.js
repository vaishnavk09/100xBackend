const express=require("express")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.post('/sum',(req,res)=>{
    const a= parseInt(req.body.a)
    const b= parseInt(req.body.b)

    res.json(
        {
            ans:a+b
        }
    )
    console.log(a+b)
})


app.listen(5000,()=>{
    console.log("server is running on http://localhost:5000")
})
