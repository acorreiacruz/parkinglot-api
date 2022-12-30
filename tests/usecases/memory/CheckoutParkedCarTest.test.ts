import ParkedCarMemoryRepository from "../../../src/infra/repositories/ParkedCarMemoryRepository";
import ParkingLotMemoryRepository from "../../../src/infra/repositories/ParkingLotMemoryRepository";
import CheckoutParkedCar from "../../../src/usecases/CheckoutParkedCar";

let parkedCarRepository: ParkedCarMemoryRepository;
let parkingLotRepository: ParkingLotMemoryRepository;
let checkoutParkedCar: CheckoutParkedCar;

beforeEach(async () => {
    parkedCarRepository = new ParkedCarMemoryRepository();
    parkingLotRepository = new ParkingLotMemoryRepository(parkedCarRepository);
    checkoutParkedCar = new CheckoutParkedCar(parkedCarRepository);
    await parkingLotRepository.saveParkingLot("McDonalds", 10, 7, 23);
    await parkedCarRepository.saveParkedCar("McDonalds", "XIW7V23", "2022-12-28T18:00:00");
});

describe("Test CheckoutParkedCar", () => {
    test("Test if CheckoutParkedCar checkout a car", async () => {
        let parkedCar = await parkedCarRepository.getParkedCar("McDonalds", "XIW7V23");
        expect(parkedCar?.plate).toBe("XIW7V23");
        expect(parkedCar?.code).toBe("McDonalds");
        await checkoutParkedCar.execute("McDonalds", "XIW7V23");
        parkedCar = await parkedCarRepository.getParkedCar("McDonalds", "XIW7V23");
        expect(parkedCar).toBeFalsy();
    }); 

    test("Test if CheckoutParkedCar can't checkout a car twice in a row", async () => {
        let parkedCar = await parkedCarRepository.getParkedCar("McDonalds", "XIW7V23");
        expect(parkedCar?.plate).toBe("XIW7V23");
        expect(parkedCar?.code).toBe("McDonalds");
        await checkoutParkedCar.execute("McDonalds", "XIW7V23");
        expect(async () => await checkoutParkedCar.execute("McDonalds", "XIW7V23")).rejects.toThrowError("This car has already left the parking lot");
    }); 

});