import ParkingLotMemoryRepository from "../../../src/infra/repositories/ParkingLotMemoryRepository";
import CreateParkingLot from "../../../src/usecases/CreateParkingLot";

let createParkingLot: CreateParkingLot;
let parkingLotRepository: ParkingLotMemoryRepository;

beforeEach(async () => {
    parkingLotRepository = new ParkingLotMemoryRepository();
    createParkingLot = new CreateParkingLot(parkingLotRepository);
    await createParkingLot.execute("Shopping", 40, 0, 7, 23);
});

describe("Test CreatingParkingLot", () => {
    test("Test if CreateParkingLot creates ParkingLot", async () => {
        const parkingLot = await parkingLotRepository.getParkingLot("Shopping");
        expect(parkingLot?.code).toBe("Shopping");
        expect(parkingLot?.getCapacity()).toBe(40);
        expect(parkingLot?.getOccupiedSpaces()).toBe(0);
    });

    test("Test if CreateParkingLot can't create the same parking lot twice in a row", async () => {
        expect(
            async() => await createParkingLot.execute("Shopping", 40, 0, 7, 23)
        ).rejects.toThrowError("There already exists a ParkingLot with this code");

    });
})