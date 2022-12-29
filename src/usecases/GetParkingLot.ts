import ParkingLot from "../entities/ParkingLot";
import ParkingLotRepository from "../infra/repositories/ParkingLotRepository";

export default class GetParkingLot {
    constructor(private parkingLotRepository: ParkingLotRepository){}
    async execute(code: string): Promise<ParkingLot>{
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);
        if(! parkingLot) throw new Error("There is no ParkingLot with this code");
        return parkingLot;
    }
}