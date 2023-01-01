import InvalidCarPlate from "./errors/InvalidCarPlate";

export default class ParkedCar {
    constructor(public code: string, public plate: string, public enterDate: Date) {
        if(!ParkedCar.isValid(plate)) throw new InvalidCarPlate();
    }
    static isValid(value: string): boolean{
        const plateType1 = /^[A-Z]{3}[0-9]{4}$/;
        const plateType2 = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;
        return plateType1.test(value) || plateType2.test(value);
    }
}