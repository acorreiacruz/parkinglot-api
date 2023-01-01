export default class CarAlreadyParked extends Error {
    constructor() {
        super("This car already is parked");
        this.name="CarAlreadyParked";
    }
}