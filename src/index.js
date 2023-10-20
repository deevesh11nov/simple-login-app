const express = require('express');
const app = express();
const userRouter = require('./routes/userRoute');
const noteRouter = require('./routes/noteRoute')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const dotenv= require('dotenv')
const cors =require('cors')

dotenv.config();

app.use(express.json())
app.use(cors());

//consoling the requests
app.use((req,res,next)=>{
    console.log(`http method -${req.method} , URL -${req.url}`)
    next();
})

//ROUTERS
app.use('/users',userRouter)
app.use('/note',noteRouter)

app.get('/',(req,res)=>{
    res.send("Home")
})

//MongoDB database
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
   app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`App is successfully running on port ${PORT} and Database`)
})
})
.catch((err)=>{
     console.log(err)
})


