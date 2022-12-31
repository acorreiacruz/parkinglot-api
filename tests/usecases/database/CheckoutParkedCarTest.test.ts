import PostgeSQLConnection from "../../../src/infra/PostgreSQLConnection";
import ParkedCarSQLRepository from "../../../src/infra/repositories/ParkedCarSQLRepository";
import ParkingLotSQLRepository from "../../../src/infra/repositories/ParkingLotSQLRepository";
import CheckoutParkedCar from "../../../src/usecases/CheckoutParkedCar";

let parkedCarRepository: ParkedCarSQLRepository;
let parkingLotRepository: ParkingLotSQLRepository;
let checkoutParkedCar: CheckoutParkedCar;
let postgreSQLConnection: PostgeSQLConnection;

beforeEach(async () => {
    postgreSQLConnection = new PostgeSQLConnection();
    parkedCarRepository = new ParkedCarSQLRepository(postgreSQLConnection);
    parkingLotRepository = new ParkingLotSQLRepository(postgreSQLConnection);
    checkoutParkedCar = new CheckoutParkedCar(parkedCarRepository);
    await parkingLotRepository.saveParkingLot("Alianz Park Arena", 10, 7, 23);
    await parkedCarRepository.saveParkedCar("Alianz Park Arena", "XIW7V23", "2022-12-28T18:00:00");
});

describe("Test CheckoutParkedCar", () => {
    test("Test if CheckoutParkedCar checkout a car", async () => {
        let parkedCar = await parkedCarRepository.getParkedCar("Alianz Park Arena", "XIW7V23");
        expect(parkedCar?.plate).toBe("XIW7V23");
        expect(parkedCar?.code).toBe("Alianz Park Arena");
        await checkoutParkedCar.execute("Alianz Park Arena", "XIW7V23");
        parkedCar = await parkedCarRepository.getParkedCar("Alianz Park Arena", "XIW7V23");
        expect(parkedCar).toBeFalsy();
    });

    // test("Test if CheckoutParkedCar can't checkout a car twice in a row", async () => {
    //     let parkedCar = await parkedCarRepository.getParkedCar("Alianz Park Arena", "XIW7V23");
    //     expect(parkedCar?.plate).toBe("XIW7V23");
    //     expect(parkedCar?.code).toBe("Alianz Park Arena");
    //     await checkoutParkedCar.execute("Alianz Park Arena", "XIW7V23");
    //     expect(async () => await checkoutParkedCar.execute("Alianz Park Arena", "XIW7V23")).rejects.toThrowError("This car has already left the parking lot");
    // });
});


afterEach(async () => {
    await postgreSQLConnection.query("DELETE FROM project.parkinglot WHERE code = $1", ["Alianz Park Arena"]);
    await postgreSQLConnection.close();
});