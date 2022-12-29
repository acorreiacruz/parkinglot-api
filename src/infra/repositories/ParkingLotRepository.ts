import ParkingLot from "../../entities/ParkingLot";

export default interface ParkingLotRepository{
    saveParkingLot(
        code: string,
        capacity: number,
        openHour: number,
        closeHour: number
    ): Promise<void>;
    
    getParkingLot(code: string): Promise<ParkingLot|undefined>;
}