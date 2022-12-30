import ParkingLot from "../entities/ParkingLot";

export default class ParkingLotAdapter {
    static create(
        code: string,
        capacity: number,
        occupiedSpaces: number,
        openHour: number,
        closeHour: number
    ): ParkingLot {
        return new ParkingLot(code, capacity, occupiedSpaces, openHour, closeHour);
    }
}