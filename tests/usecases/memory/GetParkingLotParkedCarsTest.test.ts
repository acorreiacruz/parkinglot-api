import ParkedCarMemoryRepository from "../../../src/infra/repositories/ParkedCarMemoryRepository";
import ParkingLotMemoryRepository from "../../../src/infra/repositories/ParkingLotMemoryRepository";
import GetParkingLotParkedCars from "../../../src/usecases/GetParkingLotParkedCars";

let parkedCarRepository: ParkedCarMemoryRepository;
let parkingLotRepository: ParkingLotMemoryRepository;
let getParkingLotParkedCars: GetParkingLotParkedCars;

beforeEach(async () => {
    parkedCarRepository = new ParkedCarMemoryRepository();
    parkingLotRepository = new ParkingLotMemoryRepository(parkedCarRepository);
    getParkingLotParkedCars = new GetParkingLotParkedCars(parkedCarRepository, parkingLotRepository);
    await parkingLotRepository.saveParkingLot("McDonalds", 10, 7, 23);
});

describe("Test GetParkingLotParkedCars", () => {
    test("Test if GetParkingLotParkerdCars returns all parked cars in parking lot", async () => {
        await parkedCarRepository.saveParkedCar("McDonalds", "FHG1B23", "2022-12-28T19:30:00");
        await parkedCarRepository.saveParkedCar("McDonalds", "FHG1B24", "2022-12-28T19:33:00");
        await parkedCarRepository.saveParkedCar("McDonalds", "FHG1B26", "2022-12-28T19:38:00");
        await parkedCarRepository.saveParkedCar("McDonalds", "FHG1B27", "2022-12-28T19:39:00");
        const parkedCars = await getParkingLotParkedCars.execute("McDonalds");
        expect(parkedCars).toHaveLength(4);
    });

    test("Test if GetParkingLotParkerdCars throw error when there is no parked car", async () => {
        expect(async () => await getParkingLotParkedCars.execute("McDonalds")).rejects.toThrowError("There is no parked car in this parking lot");
    });
});