export default class ParkedCar {
    constructor(public code: string, public plate: string, public enterDate: Date) {
        if(!this.isValid(plate)) throw new Error("The ParkedCar plate should be in the format XXX0000 or XXX0X00");
    }
    isValid(value: string): boolean{
        const plateType1 = /^[A-Z]{3}[0-9]{4}$/;
        const plateType2 = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;
        return plateType1.test(value) || plateType2.test(value);
    }
}