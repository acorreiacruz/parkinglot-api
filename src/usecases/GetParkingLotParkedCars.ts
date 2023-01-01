import ParkingLotDoesNotExists from "../entities/errors/ParkingLotDoesNotExists";
import ParkedCar from "../entities/ParkedCar";
import ParkedCarRepository from "../infra/repositories/ParkedCarRepository";
import ParkingLotRepository from "../infra/repositories/ParkingLotRepository";

export default class GetParkingLotParkedCars {
    constructor(
        private parkedCarRepository: ParkedCarRepository,
        private parkingLotRepository: ParkingLotRepository
    ) { }
    async execute(code: string): Promise<ParkedCar[]> {
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);
        if (!parkingLot) throw new ParkingLotDoesNotExists();
        const parkedCars = await this.parkedCarRepository.getAllParkedCars(code);
        if (!parkedCars) throw Error("There is no parked car in this parking lot");
        return parkedCars;
    }
}