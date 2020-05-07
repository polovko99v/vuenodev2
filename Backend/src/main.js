import express from "express";
import config from "./config.json"
import mongoose from 'mongoose';
import passengerRouter from './passenger';
import cors from 'cors';


const connectionUrl= config.db.url+config.db.name;
mongoose.connect(connectionUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log(`Сonnected to DB ${connectionUrl}`);   
})
.catch(error=>{console.log(error)});

const app = express();
//додаткові методи для обробки запитів POST і PUT 
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//маршрутизація
app.use("/passenger", passengerRouter);
app.use("*", (req,res)=>{res.send(`Node JS test server`)});

//запуск сервера 
app.listen(config.port);

console.log(`Server started at http://localhost:${config.port}`);