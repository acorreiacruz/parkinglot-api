export default class ParkkingLotAlreadyExists extends Error {
    constructor() {
        super("A parking lot with this code already exists");
        this.name="ParkingLotAlreadyExists";
    }
}