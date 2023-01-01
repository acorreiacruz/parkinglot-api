import ParkingLotSQLRepository from "../../../src/infra/repositories/ParkingLotSQLRepository";
import PostgreSQLConnection from "../../../src/infra/PostgreSQLConnection";
import GetParkingLot from "../../../src/usecases/GetParkingLot";

let postgreSQLConnection: PostgreSQLConnection;
let getParkingLot: GetParkingLot;
let parkingLotRepository: ParkingLotSQLRepository;

beforeEach(async () => {
    postgreSQLConnection = new PostgreSQLConnection();
    parkingLotRepository = new ParkingLotSQLRepository(postgreSQLConnection);
    await parkingLotRepository.saveParkingLot("Burguer King", 10, 6, 24);
    getParkingLot = new GetParkingLot(parkingLotRepository);
});

describe("Test GetParkingLot", () => {
    test("Test if GetParkingLot return a parking lot", async () => {
        const parkingLot = await getParkingLot.execute("Burguer King");
        expect(parkingLot.code).toBe("Burguer King");
        expect(parkingLot.getCapacity()).toBe(10);
        expect(parkingLot.getOccupiedSpaces()).toBe(0);
        expect(parkingLot.openHour).toBe(6);
        expect(parkingLot.closeHour).toBe(24);
    });

    test("Test if GetParkingLot throws a error when there isn't the parking lot", () => {
        expect(
            async () => await getParkingLot.execute("Jhon Hopkins Hospital")
        ).rejects.toThrowError("There is no parking lot with this code");
    });
});

afterEach(async () => {
    await postgreSQLConnection.query("DELETE FROM parkinglotca.parkinglot WHERE code = $1", ["Burguer King"]);
    await postgreSQLConnection.close();
})