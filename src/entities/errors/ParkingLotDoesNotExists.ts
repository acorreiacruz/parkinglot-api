export default class ParkingLotDoesNotExists extends Error {
    constructor() {
        super("There is no parking lot with this code");
        this.name = "ParkingLotDoesNotExists";
    }
}