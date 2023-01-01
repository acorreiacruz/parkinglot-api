export default class ParkingLotIsClosed extends Error {
    constructor() {
        super("The parking lot is closed");
        this.name = "ParkingLotIsClosed";
    }
}