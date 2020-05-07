import mongoose from 'mongoose';

const passengerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    luggageCount:{
        type:Number,
        min:1,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    luggageWeight:{
        type:Number,
        min:1,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    }
});

const Passenger = mongoose.model("Passenger", passengerSchema);

export default Passenger;