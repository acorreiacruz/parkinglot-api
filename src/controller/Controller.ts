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

export type ControllerOutput = {
    body: any;
    statusCode: number
};

const createControllerOutput = (code: number, body: any, error: boolean = false): ControllerOutput => {
    return { body: error ? { error: body.message } : body, statusCode: code };
}

export class Controller {
    static async getParkingLot(params: any, body: any): Promise<ControllerOutput> {
        const getParkingLot = new GetParkingLot(parkingLotRepository);
        let parkingLot: ParkingLot;
        try {
            parkingLot = await getParkingLot.execute(params.code);
        } catch (e: any) {
            return createControllerOutput(404, e, true);
        }
        return createControllerOutput(200, parkingLot);
    }

    static async createParkingLot(params: any, body: any): Promise<ControllerOutput> {
        const createParkingLot = new CreateParkingLot(parkingLotRepository);
        try {
            await createParkingLot.execute(body.code, body.capacity, body.open_hour, body.close_hour);
        } catch (error: any) {
            return createControllerOutput(406, error, true);
        }
        return createControllerOutput(201, "Parking lot created with successfully");
    }

    static async checkoutParkedCar(params: any, body: any): Promise<ControllerOutput> {
        const checkoutParkedCar = new CheckoutParkedCar(parkedCarRepository);
        try {
            await checkoutParkedCar.execute(params.code, params.plate.toUpperCase());
        } catch (e: any) {
            return createControllerOutput(406, e, true);
        }
        return createControllerOutput(200, "Checkout realized successfully");
    }

    static async parkCar(params: any, body: any) {
        const parkCark = new ParkCar(parkedCarRepository, parkingLotRepository);
        try {
            await parkCark.execute(params.code, body.plate, body.enter_date);
        } catch (e: any) {
            return createControllerOutput(406, e, true);
        }
        return createControllerOutput(200, "Car parked with successfully");
    }

    static async getParkingLotParkedCars(params: any, body: any) {
        const getParkingLotParkedCars = new GetParkingLotParkedCars(parkedCarRepository, parkingLotRepository);
        let parkedCars: ParkedCar[];
        try {
            parkedCars = await getParkingLotParkedCars.execute(params.code);
        } catch (e: any) {
            return createControllerOutput(404, e, true);
        }
        return createControllerOutput(200, parkedCars);
    }
}