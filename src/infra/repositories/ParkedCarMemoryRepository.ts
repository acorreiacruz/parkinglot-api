import ParkedCar from "../../entities/ParkedCar";
import ParkedCarRepository from "./ParkedCarRepository";

type ParkedCardData = {
    code: string,
    plate: string,
    enterDate: string,
    checkoutDate: string
}

export default class ParkedCarMemoryRepository implements ParkedCarRepository {
    private parkedCarsData: ParkedCardData[];

    constructor() {
        this.parkedCarsData = [];
    }

    async getParkedCar(code: string, plate: string): Promise<ParkedCar> {
        const parkedCarData = this.parkedCarsData.find(
            (data) => data.code === code && data.plate === plate && !data.checkoutDate
        );
        if (!parkedCarData) throw new Error("There is no parked car with this informations");
        return new ParkedCar(
            parkedCarData.code,
            parkedCarData.plate,
            new Date(parkedCarData.enterDate)
        );
    }

    async saveParkedCar(code: string, plate: string, enterDate: string): Promise<void> {
        this.parkedCarsData.push({
            code: code,
            plate: plate,
            enterDate: enterDate,
            checkoutDate: ""
        })
    }

    async getAllParkedCars(code: string): Promise<ParkedCar[]> {
        const parkedCars: ParkedCar[] = [];
        const parkedCarsData = this.parkedCarsData.filter((data) => data.code === code && !data.checkoutDate);
        for (const data of parkedCarsData) {
            parkedCars.push(
                new ParkedCar(data.code, data.plate, new Date(data.enterDate))
            );
        }
        return parkedCars;
    }

    async checkoutParkedCar(code: string, plate: string): Promise<void> {
        for (const data of this.parkedCarsData) {
            if (data.code === code && data.plate == plate && !data.checkoutDate) {
                data.checkoutDate = new Date().toISOString();
                break;
            }
            if (data.code === code && data.plate == plate && data.checkoutDate) {
                throw new Error("This car has already left the parking lot");
            }
        }
    }

    async getOccupiedSpaces(code: string): Promise<number> {
        let total = 0;
        for (const data of this.parkedCarsData) {
            if (data.code === code && !data.checkoutDate) total += 1;
        }
        return total;
    }
}