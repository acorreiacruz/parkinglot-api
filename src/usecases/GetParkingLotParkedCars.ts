import ParkingLotDoesNotExists from "../entities/errors/ParkingLotDoesNotExists";
import ThereIsNoParkedCar from "../entities/errors/ThereIsNoParkedCar";
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
        if (!parkedCars) throw new ThereIsNoParkedCar();
        return parkedCars;
    }
}