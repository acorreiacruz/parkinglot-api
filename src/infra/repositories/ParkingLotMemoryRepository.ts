import ParkingLot from "../../entities/ParkingLot";
import ParkedCarRepository from "./ParkedCarRepository";
import ParkingLotRepository from "./ParkingLotRepository";


type ParkingLotData = {
    code: string,
    capacity: number,
    openHour: number,
    closeHour: number
}

export default class ParkingLotMemoryRepository implements ParkingLotRepository {
    private parkingLotsData: ParkingLotData[];
    constructor(private parkedCarRepository: ParkedCarRepository) {
        this.parkingLotsData = [];
    }

    async saveParkingLot(
        code: string,
        capacity: number,
        openHour: number,
        closeHour: number
    ): Promise<void> {
        const exists = await this.getParkingLot(code);
        if (exists) throw new Error("There already exists a ParkingLot with this code");
        this.parkingLotsData.push({
            code: code,
            capacity: capacity,
            openHour: openHour,
            closeHour: closeHour
        });
    }

    async getParkingLot(code: string): Promise<ParkingLot|undefined> {
        const parkingLotData = this.parkingLotsData.find((data) => data.code === code);
        if (!parkingLotData) return undefined;
        const occupiedSpaces = await this.parkedCarRepository.getOccupiedSpaces(code);
        return new ParkingLot(
            parkingLotData.code,
            parkingLotData.capacity,
            occupiedSpaces,
            parkingLotData.openHour,
            parkingLotData.closeHour
        );
    }
}