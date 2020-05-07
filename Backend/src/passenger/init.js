import Passenger from './model';

export default {
    async run(req,res){
        try{
            await Passenger.deleteMany({});
            const passengers = [
                {
                    name:"Polovko I.I",
                    destination:"USA",
                    luggageCount:1,
                    luggageWeight:10
                },
                {
                    name:"Saroz V.Y",
                    destination:"UK",
                    luggageCount:3,
                    luggageWeight:15 
                },
                {
                    name:"Prodan I.I",
                    destination:"Tokyo",
                    luggageCount:5,
                    luggageWeight:25
                }
            ];
            passengers.forEach(async passenger=>await new Passenger(passenger).save());
        } catch(error){
            console.log(error)
        }
    }
}