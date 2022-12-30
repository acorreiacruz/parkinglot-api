import ParkedCar from "../../entities/ParkedCar";

export default interface ParkedCarRepository {
    saveParkedCar(code: string , plate: string, enterDate: string): Promise<void>;
    getAllParkedCars(code: string): Promise<ParkedCar[]|undefined>;
    checkoutParkedCar(code: string, plate: string): Promise<void>;
    getParkedCar(code:string, plate:string): Promise<ParkedCar|undefined>;
}