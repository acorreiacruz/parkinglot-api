import CarAlreadyParked from "../entities/errors/CarAlreadyParked";
import InvalidCarPlate from "../entities/errors/InvalidCarPlate";
import ParkingLotDoesNotExists from "../entities/errors/ParkingLotDoesNotExists";
import ParkedCar from "../entities/ParkedCar";
import ParkedCarRepository from "../infra/repositories/ParkedCarRepository";
import ParkingLotRepository from "../infra/repositories/ParkingLotRepository";

export default class ParkCar {
    constructor(
        private parkedCarRepository: ParkedCarRepository,
        private parkingLotRepository: ParkingLotRepository
    ) { }
    async execute(code: string, plate: string, enterDate: string): Promise<void> {
        if(!ParkedCar.isValid(plate)) throw new InvalidCarPlate();
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);
        if(!parkingLot) throw new ParkingLotDoesNotExists();
        const parkedCar = await this.parkedCarRepository.getParkedCar(code, plate);
        if(parkedCar) throw new CarAlreadyParked();
        if(!parkingLot.isOpen(new Date(enterDate))) throw new Error("The parking lot is closed");
        if(parkingLot.isFull()) throw new Error("The parking lot is full");
        await this.parkedCarRepository.saveParkedCar(code, plate, enterDate);
    }
}