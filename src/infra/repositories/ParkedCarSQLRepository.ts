import ParkedCar from "../../entities/ParkedCar";
import Connection from "../Connection";
import ParkedCarRepository from "./ParkedCarRepository";

export default class ParkedCarSQLRepository implements ParkedCarRepository {
    constructor(private connection: Connection) { }
    
    async getOccupiedSpaces(code: string): Promise<number> {
        const data = await this.connection.one("SELECT COUNT(*) FROM parkinglotca.parkedcar WHERE code=$1 AND checkout_date IS NULL", [code]);
        return parseInt(data);
    }

    async saveParkedCar(code: string, plate: string, enterDate: string): Promise<void> {
        await this.connection.query("INSERT INTO parkinglotca.parkedcar(code, plate, enter_date) VALUES($1, $2, $3)", [code, plate, enterDate]);
    }

    async getAllParkedCars(code: string): Promise<ParkedCar[] | undefined> {
        const parkedCarsData = await this.connection.query("SELECT * FROM parkinglotca.parkedcar WHERE code=$1 AND checkout_date IS NULL", [code]);
        if (parkedCarsData.length === 0) return undefined;
        const parkedCars: ParkedCar[] = [];
        for (const data of parkedCarsData) {
            parkedCars.push(
                new ParkedCar(data.code, data.plate, new Date(data.enter_date))
            );
        }
        return parkedCars;
    }

    async checkoutParkedCar(code: string, plate: string): Promise<void> {
        await this.connection.query("UPDATE parkinglotca.parkedcar SET checkout_date=NOW() WHERE EXISTS (SELECT * FROM project.parkinglot WHERE code = $1) AND plate=$2 AND checkout_date IS NULL", [code, plate]);
    }

    async getParkedCar(code: string, plate: string): Promise<ParkedCar | undefined> {
        const parkedCarData = await this.connection.one("SELECT * FROM parkinglotca.parkedcar WHERE code=$1 AND plate=$2 AND checkout_date IS NULL", [code, plate]);
        if (!parkedCarData) return undefined;
        return new ParkedCar(parkedCarData.code, parkedCarData.plate, new Date(parkedCarData.enter_date));
    }
}