const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
const authRouter = require('./router/auth');

dotenv.config();
const app=express();

app.use(bodyParser.json());
app.use(cors());

const PORT=process.env.PORT || 6000;


const taskRoutes = require("./router/tasks");
app.use("/api/tasks", taskRoutes);

const postRoutes = require('./router/posts');
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`port running on ${PORT}`);
    })
}).catch((err)=>console.log("err",err));

app.use('/api/auth',authRouter);

