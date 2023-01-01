import PostgreSQLConnection from "../../../src/infra/PostgreSQLConnection";
import ParkedCarSQLRepository from "../../../src/infra/repositories/ParkedCarSQLRepository";
import ParkingLotSQLRepository from "../../../src/infra/repositories/ParkingLotSQLRepository";
import ParkCar from "../../../src/usecases/ParkCar";

let parkedCarRepository: ParkedCarSQLRepository;
let parkingLotRepository: ParkingLotSQLRepository;
let postgreSQLConnection: PostgreSQLConnection;
let parkCar: ParkCar;

beforeEach(async () => {
    postgreSQLConnection = new PostgreSQLConnection();
    parkedCarRepository = new ParkedCarSQLRepository(postgreSQLConnection);
    parkingLotRepository = new ParkingLotSQLRepository(postgreSQLConnection);
    parkCar = new ParkCar(parkedCarRepository, parkingLotRepository);
    await parkingLotRepository.saveParkingLot("Moes's Bar", 4, 7, 22);
});

describe("Test ParkCar", () => {
    test("Test if ParkCar park a car", async () => {
        await parkCar.execute("Moes's Bar", "ABC1D00", "2022-12-29T18:00:00");
        const parkingLot = await parkingLotRepository.getParkingLot("Moes's Bar");
        expect(parkingLot?.getOccupiedSpaces()).toBe(1);
    });

    test("Test if ParkCar doesn't park a car if there isn't the parking lot", async () => {
        expect(
            async () => await parkCar.execute("McDonalds", "ABC1D00", "2022-12-29T18:00:00")
        ).rejects.toThrowError("There is no parking lot with this code");
    });

    test("Test if ParkCar doesn't park a car if parking lot is closed", async () => {
        expect(
            async () => await parkCar.execute("Moes's Bar", "ABC1D00", "2022-12-29T6:00:00")
        ).rejects.toThrowError("The parking lot is closed");
    });

    test("Test if ParkCar doesn't park a car if parking lot is full", async () => {
        await parkCar.execute("Moes's Bar", "ABC1D00", "2022-12-29T16:00:00");
        await parkCar.execute("Moes's Bar", "ABC1D01", "2022-12-29T16:00:00");
        await parkCar.execute("Moes's Bar", "ABC1D02", "2022-12-29T16:00:00");
        await parkCar.execute("Moes's Bar", "ABC1D03", "2022-12-29T16:00:00");
        expect(
            async () => await parkCar.execute("Moes's Bar", "ABC1D04", "2022-12-29T16:00:00")
        ).rejects.toThrowError("The parking lot is full");
    });
    test("Test if ParkCar doesn't park a car twice in a row", async () => {
        await parkCar.execute("Moes's Bar", "ABC1D00", "2022-12-29T16:00:00");
        expect(
            async () => await parkCar.execute("Moes's Bar", "ABC1D00", "2022-12-29T16:30:00")
        ).rejects.toThrowError("This car already is parked");
    });
});

afterEach(async () => {
    await postgreSQLConnection.query("DELETE FROM parkinglotca.parkinglot WHERE code=$1", ["Moes's Bar"]);
    await postgreSQLConnection.close();
});