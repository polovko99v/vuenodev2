import express from 'express';
import passengerControler from './controler';

const passengerRouter = new express.Router();

passengerRouter.get("/", passengerControler.get);
passengerRouter.get("/:id", passengerControler.getById);
passengerRouter.post("/", passengerControler.post);
passengerRouter.delete("/:id", passengerControler.delete);
passengerRouter.patch("/:id", passengerControler.patch);

export default passengerRouter;
