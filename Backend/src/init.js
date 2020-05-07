import mongoose, { mongo, connection } from "mongoose";
import config from "./config.json";
import initPassengers from './passenger/init';

const connectionUrl= config.db.url+config.db.name;
mongoose.connect(connectionUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    //виклик ініціалізації списку книг 
    initPassengers.run().then( ()=>{
        console.log(`Database was initialised`);  
    }); 
})
.catch(error=>{console.log(error)});


