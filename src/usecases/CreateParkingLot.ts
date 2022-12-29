import ParkingLotRepository from "../infra/repositories/ParkingLotRepository";

export default class CreateParkingLot {
    constructor(private parkingLotRepository: ParkingLotRepository) { }

    async execute(
        code: string,
        capacity: number,
        openHour: number,
        closeHour: number
    ): Promise<void> {
        await this.parkingLotRepository.saveParkingLot(code, capacity, openHour, closeHour);
    }
}