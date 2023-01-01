export default class ThereIsNoParkedCar extends Error {
    constructor() {
        super("There is no parked car in this parking lot");
        this.name = "ThereIsNoParkedCar";
    }
}