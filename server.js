import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoute from './routes/auth.route.js';
import albumRoute from './routes/album.route.js';
dotenv.config();


// mongoose connection
mongoose.set('strictQuery',true);
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
};


const app = express();

// Middle Wares
app.use(morgan("common"));
app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/album',albumRoute);


app.listen(8000,()=>{
    connect();
    console.log("Server Started");
})