import Passenger from './model';
import { get } from 'mongoose';

const passengerControler = {
    async get(req,res) {
        try{
            const list = await Passenger.find(makeQueryObject (req.query));
            res.send(list);
        } catch (error) {
            res.status(500).send(error);
        }

        function makeQueryObject(query){
            let result={};
            if(query.place)
            result.$expr={"$eq":[{"$place":"$destination"},]};
        }
    },
    async getById(req,res){
        try{
            const passenger = await Passenger.findById(req.params.id);
            if(!passenger)
                res.status(404).send("Not found");
            res.send(passenger);

        } catch(error){
            res.status(500).send(error);
        }
    },
    async post (req, res) {
        try {
            const passenger = new Passenger(req.body);
            await passenger.save();
            res.send(passenger);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    async delete (req, res) {
        try {
            const passenger = await Passenger.findByIdAndDelete(req.params.id);
            if (!passenger)
                res.status(404).send("Not found");
            res.send(passenger);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async patch(req, res) {
        try {
            const passenger = await Passenger.findByIdAndUpdate(req.params.id, req.body,  {new: true});
            if (!passenger)
                res.status(404).send("Not found");
            await passenger.save();
            res.send(passenger);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default passengerControler;