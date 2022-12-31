import ParkedCar from "../entities/ParkedCar";
import ParkingLot from "../entities/ParkingLot";
import PostgeSQLConnection from "../infra/PostgreSQLConnection";
import ParkedCarSQLRepository from "../infra/repositories/ParkedCarSQLRepository";
import ParkingLotSQLRepository from "../infra/repositories/ParkingLotSQLRepository";
import CheckoutParkedCar from "../usecases/CheckoutParkedCar";
import CreateParkingLot from "../usecases/CreateParkingLot";
import GetParkingLot from "../usecases/GetParkingLot";
import GetParkingLotParkedCars from "../usecases/GetParkingLotParkedCars";
import ParkCar from "../usecases/ParkCar";

const postgreSQLConnection = new PostgeSQLConnection();
const parkingLotRepository = new ParkingLotSQLRepository(postgreSQLConnection);
const parkedCarRepository = new ParkedCarSQLRepository(postgreSQLConnection);

export default class Controller {
    static async getParkingLot(params: any, body: any) {
        const getParkingLot = new GetParkingLot(parkingLotRepository);
        let parkingLot: ParkingLot;
        try{
            parkingLot = await getParkingLot.execute(params.code);    
        }catch(e: any){
            return {error: e.message};
        }
        return parkingLot;
    }

    static async createParkingLot(params: any, body: any) {
        const createParkingLot = new CreateParkingLot(parkingLotRepository);
        try{
            await createParkingLot.execute(body.code, body.capacity, body.open_hour, body.close_hour);
        }catch(e: any){
            return {error: e.message}
        }
        return {message: "Parking lot created with successfully"}
    }

    static async checkoutParkedCar(params:any, body:any){
        const checkoutParkedCar = new CheckoutParkedCar(parkedCarRepository);
        try{
            await checkoutParkedCar.execute(params.code, params.plate.toUpperCase());
        }catch(e:any){
            return {error:e.message}
        }
        return {
            message:"Checkout realized successfully"
        }
    }

    static async parkCar(params:any, body:any){
        const parkCark = new ParkCar(parkedCarRepository, parkingLotRepository);
        try{
            await parkCark.execute(params.code, body.plate, body.enter_date);
        }catch(e:any){
            return {error:e.message}
        }
        return {
            message:"Car parked with successfully"
        }
    }

    static async getParkingLotParkedCars(params:any, body:any){
        const getParkingLotParkedCars = new GetParkingLotParkedCars(parkedCarRepository, parkingLotRepository);
        let parkedCars: ParkedCar[];
        try{
            parkedCars = await getParkingLotParkedCars.execute(params.code);
        }catch(e:any){
            return {error:e.message}
        }
        return parkedCars;
    }
}