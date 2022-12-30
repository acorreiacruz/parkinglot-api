import PostgreSQLConnection from "../../../src/infra/PostgreSQLConnection";
import ParkingLotSQLRepository from "../../../src/infra/repositories/ParkingLotSQLRepository";
import CreateParkingLot from "../../../src/usecases/CreateParkingLot";

let createParkingLot: CreateParkingLot;
let parkingLotRepository: ParkingLotSQLRepository;
let postgreSQLConnection: PostgreSQLConnection;

beforeEach(async () => {
    postgreSQLConnection = new PostgreSQLConnection();
    parkingLotRepository = new ParkingLotSQLRepository(postgreSQLConnection);
    createParkingLot = new CreateParkingLot(parkingLotRepository);
    await createParkingLot.execute("Tennis Club", 40, 7, 23);
});

describe("Test CreatingParkingLot", () => {
    test("Test if CreateParkingLot creates ParkingLot", async () => {
        const parkingLot = await parkingLotRepository.getParkingLot("Tennis Club");
        expect(parkingLot?.code).toBe("Tennis Club");
        expect(parkingLot?.getCapacity()).toBe(40);
        expect(parkingLot?.getOccupiedSpaces()).toBe(0);
    });

    test("Test if CreateParkingLot can't create the same parking lot twice in a row", async () => {
        expect(
            async () => await createParkingLot.execute("Tennis Club", 40, 7, 23)
        ).rejects.toThrowError("A parking lot with this code already exists");

    });
})

afterEach(async () => {
    await postgreSQLConnection.query("DELETE FROM project.parkinglot WHERE code=$1",["Tennis Club"]);
    await postgreSQLConnection.close();
})