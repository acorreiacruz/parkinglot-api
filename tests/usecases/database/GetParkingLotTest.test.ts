import ParkingLotSQLRepository from "../../../src/infra/repositories/ParkingLotSQLRepository";
import PostgreSQLConnection from "../../../src/infra/PostgreSQLConnection";
import GetParkingLot from "../../../src/usecases/GetParkingLot";

let postgreSQLConnection: PostgreSQLConnection;
let getParkingLot: GetParkingLot;
let parkingLotRepository: ParkingLotSQLRepository;

beforeEach(async () => {
    postgreSQLConnection = new PostgreSQLConnection();
    parkingLotRepository = new ParkingLotSQLRepository(postgreSQLConnection);
    getParkingLot = new GetParkingLot(parkingLotRepository);
});

describe("Test GetParkingLot", () => {
    test("Test if GetParkingLot return a parking lot", async () => {
        const parkingLot = await getParkingLot.execute("Burguer King");
        expect(parkingLot.code).toBe("Burguer King");
        expect(parkingLot.getCapacity()).toBe(10);
        expect(parkingLot.getOccupiedSpaces()).toBe(3);
        expect(parkingLot.openHour).toBe(6);
        expect(parkingLot.closeHour).toBe(24);
    });

    test("Test if GetParkingLot throws a error when there isn't the parking lot", async () => {
        expect(
            async () => await getParkingLot.execute("Jhon Hopkins Hospital")
        ).rejects.toThrowError("There is no ParkingLot with this code");
    });
});

afterEach(async () => {
    await postgreSQLConnection.close();
})