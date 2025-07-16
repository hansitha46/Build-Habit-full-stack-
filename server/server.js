import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import habitRoutes from './routes/habits.js';
dotenv.config();



const app = express();

//middle ware
app.use(cors());
app.use(express.json());

app.use('/users/api/habits',habitRoutes);

app.get('/',(req,res)=>{
    res.send('Hello world!');
});

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("connected to mongodb");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT,()=>{
            console.log(`server is listening to port: ${PORT}`);
        });
    })
    .catch(err => console.error('mongoDb connection error: ',err));