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

const createControllerOutput = (code: number, body: any): ControllerOutput => {
    return { body: {error:body.message} || {detail:body}, statusCode: code };
}

export class Controller {
        const getParkingLot = new GetParkingLot(parkingLotRepository);
        let parkingLot: ParkingLot;
        }
    }

        const createParkingLot = new CreateParkingLot(parkingLotRepository);
            await createParkingLot.execute(body.code, body.capacity, body.open_hour, body.close_hour);
        }
    }

        const checkoutParkedCar = new CheckoutParkedCar(parkedCarRepository);
            await checkoutParkedCar.execute(params.code, params.plate.toUpperCase());
        }
        return {
        }
    }

        const parkCark = new ParkCar(parkedCarRepository, parkingLotRepository);
            await parkCark.execute(params.code, body.plate, body.enter_date);
        }
        return {
        }
    }

        const getParkingLotParkedCars = new GetParkingLotParkedCars(parkedCarRepository, parkingLotRepository);
        let parkedCars: ParkedCar[];
            parkedCars = await getParkingLotParkedCars.execute(params.code);
        }
        return parkedCars;
    }
}