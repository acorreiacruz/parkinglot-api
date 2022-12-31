import Express from "express";
import ExpressAdapter from "../../adapters/ExpressAdapter";
import Controller from "../../controller/Controller";

const app = Express();
app.use(Express.json());

app.get("/api/parkinglots/:code/", ExpressAdapter.create(Controller.getParkingLot));
app.post("/api/parkinglots/", ExpressAdapter.create(Controller.createParkingLot));
app.get(
    "/api/parkinglots/:code/checkout/:plate/", 
    ExpressAdapter.create(Controller.checkoutParkedCar)
);
app.post("/api/parkinglots/:code/parkcar/", ExpressAdapter.create(Controller.parkCar));
app.get("/api/parkinglots/:code/parkedcars/", ExpressAdapter.create(Controller.getParkingLotParkedCars));

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000/");
});