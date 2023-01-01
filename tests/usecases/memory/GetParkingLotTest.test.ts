import ParkedCarMemoryRepository from "../../../src/infra/repositories/ParkedCarMemoryRepository";
import ParkingLotMemoryRepository from "../../../src/infra/repositories/ParkingLotMemoryRepository";
import GetParkingLot from "../../../src/usecases/GetParkingLot";

let getParkingLot: GetParkingLot;

beforeEach(async () => {
    const parkedCarRepository = new ParkedCarMemoryRepository()
    const parkingLotRepository = new ParkingLotMemoryRepository(parkedCarRepository);
    await parkingLotRepository.saveParkingLot("Movie Theater", 35, 7, 22);
    getParkingLot = new GetParkingLot(parkingLotRepository);
});

describe("Test GetParkingLot", () => {
    test("Test if GetParkingLot return a parking lot", async () =>{
        const parkingLot = await getParkingLot.execute("Movie Theater");
        expect(parkingLot.code).toBe("Movie Theater");
        expect(parkingLot.getCapacity()).toBe(35);
        expect(parkingLot.getOccupiedSpaces()).toBe(0);
        expect(parkingLot.openHour).toBe(7);
        expect(parkingLot.closeHour).toBe(22);
    });

    test("Test if GetParkingLot throws a error when there isn't the parking lot", async () =>{
        expect(
            async () => await getParkingLot.execute("Super Market")
        ).rejects.toThrowError("There is no parking lot with this code");
    });
});