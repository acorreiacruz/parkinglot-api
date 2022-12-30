import ParkedCarMemoryRepository from "../../../src/infra/repositories/ParkedCarMemoryRepository";
import ParkingLotMemoryRepository from "../../../src/infra/repositories/ParkingLotMemoryRepository";
import ParkCar from "../../../src/usecases/ParkCar";

let parkedCarRepository: ParkedCarMemoryRepository;
let parkingLotRepository: ParkingLotMemoryRepository;
let parkCar: ParkCar;

beforeEach(async () => {
    parkedCarRepository = new ParkedCarMemoryRepository();
    parkingLotRepository = new ParkingLotMemoryRepository(parkedCarRepository);
    parkCar = new ParkCar(parkedCarRepository, parkingLotRepository);
    await parkingLotRepository.saveParkingLot("Burguer King", 4, 7, 22);
});

describe("Test ParkCar", () => {
    test("Test if ParkCar park a car", async () => {
        await parkCar.execute("Burguer King", "ABC1D00", "2022-12-29T18:00:00");
        const parkingLot = await parkingLotRepository.getParkingLot("Burguer King");
        expect(parkingLot?.getOccupiedSpaces()).toBe(1);
    });

    test("Test if ParkCar doesn't park a car if there isn't the parking lot", async () => {
        expect(
            async () => await parkCar.execute("McDonalds", "ABC1D00", "2022-12-29T18:00:00")
        ).rejects.toThrowError("There is no parking lot with this code");
    });

    test("Test if ParkCar doesn't park a car if parking lot is closed", async () => {
        expect(
            async () => await parkCar.execute("Burguer King", "ABC1D00", "2022-12-29T6:00:00")
        ).rejects.toThrowError("The parking lot is closed");
    });

    test("Test if ParkCar doesn't park a car if parking lot is full", async () => {
        await parkCar.execute("Burguer King", "ABC1D00", "2022-12-29T16:00:00");
        await parkCar.execute("Burguer King", "ABC1D01", "2022-12-29T16:00:00");
        await parkCar.execute("Burguer King", "ABC1D02", "2022-12-29T16:00:00");
        await parkCar.execute("Burguer King", "ABC1D03", "2022-12-29T16:00:00");
        expect(
            async()=> await parkCar.execute("Burguer King", "ABC1D04", "2022-12-29T16:00:00")
        ).rejects.toThrowError("The parking lot is full");
    });
    test("Test if ParkCar doesn't park a car twice in a row", async () => {
        await parkCar.execute("Burguer King", "ABC1D00", "2022-12-29T16:00:00");
        expect(
            async()=> await parkCar.execute("Burguer King", "ABC1D00", "2022-12-29T16:30:00")
        ).rejects.toThrowError("This car already is parked");
    });
});