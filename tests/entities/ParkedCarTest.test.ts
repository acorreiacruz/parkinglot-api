import ParkedCar from "../../src/entities/ParkedCar";

describe("Test ParkedCar", () => {
    test("Test if ParkedCar is created", () => {
        const parkedCar = new ParkedCar("Shopping", "AAA1001", new Date("2022-12-28T15:00:00"));
        expect(parkedCar.code).toBe("Shopping");
        expect(parkedCar.plate).toBe("AAA1001");
    });
    test("Test if ParkedCar with invalid plate isn't created", () => {
        expect(
            () => new ParkedCar(
                "Shopping", "AAAA1001",
                new Date("2022-12-28T15:00:00")
            )
        ).toThrowError("The ParkedCar plate should be in the format XXX0000 or XXX0X00");
        expect(
            () => new ParkedCar(
                "Shopping", "AAA1A010",
                new Date("2022-12-28T15:00:00")
            )
        ).toThrowError("The ParkedCar plate should be in the format XXX0000 or XXX0X00");
    });
})