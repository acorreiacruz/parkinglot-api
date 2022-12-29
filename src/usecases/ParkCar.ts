import ParkedCarRepository from "../infra/repositories/ParkedCarRepository";
import ParkingLotRepository from "../infra/repositories/ParkingLotRepository";

export default class ParkCar {
    constructor(
        private parkedCarRepository: ParkedCarRepository,
        private parkingLotRepository: ParkingLotRepository
    ) { }
    async execute(code: string, plate: string, enterDate: string): Promise<void> {
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);
        if(!parkingLot) throw new Error("There is no parking lot with this code");
        if(!parkingLot.isOpen(new Date(enterDate))) throw new Error("The parking lot is closed");
        if(parkingLot.isFull()) throw new Error("The parking lot is full");
        await this.parkedCarRepository.saveParkedCar(code, plate, enterDate);
    }
}