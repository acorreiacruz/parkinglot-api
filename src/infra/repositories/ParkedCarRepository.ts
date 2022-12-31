import ParkedCar from "../../entities/ParkedCar";

export default interface ParkedCarRepository {
    saveParkedCar(code: string , plate: string, enterDate: string): Promise<void>;
    getAllParkedCars(code: string): Promise<ParkedCar[]|undefined>;
    checkoutParkedCar(code: string, plate: string): Promise<void>;
    getOccupiedSpaces(code: string): Promise<number>;
    getParkedCar(code:string, plate:string): Promise<ParkedCar|undefined>;
}