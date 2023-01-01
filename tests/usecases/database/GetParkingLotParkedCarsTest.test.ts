import PostgreSQLConnection from "../../../src/infra/PostgreSQLConnection";
import ParkedCarSQLRepository from "../../../src/infra/repositories/ParkedCarSQLRepository";
import ParkingLotSQLRepository from "../../../src/infra/repositories/ParkingLotSQLRepository";
import GetParkingLotParkedCars from "../../../src/usecases/GetParkingLotParkedCars";

let postgreSQLConnection: PostgreSQLConnection;
let parkedCarRepository: ParkedCarSQLRepository;
let parkingLotRepository: ParkingLotSQLRepository;
let getParkingLotParkedCars: GetParkingLotParkedCars;

beforeEach(async () => {
    postgreSQLConnection = new PostgreSQLConnection()
    parkedCarRepository = new ParkedCarSQLRepository(postgreSQLConnection);
    parkingLotRepository = new ParkingLotSQLRepository(postgreSQLConnection);
    getParkingLotParkedCars = new GetParkingLotParkedCars(parkedCarRepository, parkingLotRepository);
    await parkingLotRepository.saveParkingLot("Orlando Outlet", 10, 7, 23);
});

describe("Test GetParkingLotParkedCars", () => {
    test("Test if GetParkingLotParkerdCars returns all parked cars in parking lot", async () => {
        await parkedCarRepository.saveParkedCar("Orlando Outlet", "FHG1B23", "2022-12-28T19:30:00");
        await parkedCarRepository.saveParkedCar("Orlando Outlet", "FHG1B24", "2022-12-28T19:33:00");
        await parkedCarRepository.saveParkedCar("Orlando Outlet", "FHG1B26", "2022-12-28T19:38:00");
        await parkedCarRepository.saveParkedCar("Orlando Outlet", "FHG1B27", "2022-12-28T19:39:00");
        const parkedCars = await getParkingLotParkedCars.execute("Orlando Outlet");
        expect(parkedCars).toHaveLength(4);
    });

    test("Test if GetParkingLotParkerdCars throw error when there is no parked car", async () => {
        expect(async () => await getParkingLotParkedCars.execute("Orlando Outlet")).rejects.toThrowError("There is no parked car in this parking lot");
    });
});

afterEach(async () => {
    await postgreSQLConnection.query("DELETE FROM parkinglotca.parkinglot WHERE code=$1",["Orlando Outlet"]);
    await postgreSQLConnection.close();
});