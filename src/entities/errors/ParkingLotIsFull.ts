export default class ParkingLotIsFull extends Error {
    constructor(){
        super("The parking lot is full");
        this.name = "ParkingLotIsFull";
    }
}