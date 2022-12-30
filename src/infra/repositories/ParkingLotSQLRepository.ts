import ParkingLotAdapter from "../../adapters/ParkingLotAdapter";
import ParkingLot from "../../entities/ParkingLot";
import Connection from "../Connection";
import ParkingLotRepository from "./ParkingLotRepository";

export default class ParkingLotSQLRepository implements ParkingLotRepository{
    constructor(private connection: Connection){}

    async saveParkingLot(code: string, capacity: number, openHour: number, closeHour: number): Promise<void> {
        try{
            await this.connection.query(
                "INSERT INTO project.parkinglot(code, capacity, open_hour, close_hour) VALUES($1, $2, $3, $4)",
                [code, capacity, openHour, closeHour]
            );
        }
        catch(error){
            throw new Error("A parking lot with this code already exists");
        }
            
    }
    async getParkingLot(code: string): Promise<ParkingLot|undefined> {
        const parkingLotData = await this.connection.one(
            "SELECT pl.code, pl.capacity, pl.open_hour, pl.close_hour,(SELECT COUNT(*) FROM project.parkedcar as pc WHERE pc.code = pl.code AND pc.checkout_date IS NULL)::int AS occupied_spaces FROM project .parkinglot AS pl WHERE pl.code = $1",
            [code]
        );
        if(!parkingLotData) return undefined;
        return ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.occupied_spaces, parkingLotData.open_hour, parkingLotData.close_hour);
    }

}