export default class InvalidCarPlate extends Error {
    constructor(){
        super("The ParkedCar plate should be in the format XXX0000 or XXX0X00");
        this.name = "InvalidCarPlate";
    }
}