import ParkingLot from "../../src/entities/ParkingLot";

describe("Test ParkingLot", () => {
    test("Test if ParkingLot is created", () => {
        const parkingLot = new ParkingLot("Shopping", 50, 0, 8, 23);
        expect(parkingLot.code).toBe("Shopping");
        expect(parkingLot.getCapacity()).toBe(50);
        expect(parkingLot.getOccupiedSpaces()).toBe(0);
        expect(parkingLot.isFull()).toBeFalsy();
        expect(parkingLot.isOpen(new Date("2022-12-28T15:00:00"))).toBeTruthy();
        expect(parkingLot.openHour).toBe(8);
        expect(parkingLot.closeHour).toBe(23);
    });

    test("Test if ParkingLot with invalid capacity is not created", () => {
        expect(() => new ParkingLot("Shopping", -50, 0, 8, 23)).toThrowError("The ParkingLot capacity should be a positive integer");
    });

    test("Test if ParkingLot with invalid occupied spaces is not created", () => {
        expect(() => new ParkingLot("Shopping", 50, -1, 8, 23)).toThrowError("The Parking lot occupied spaces can't be a negative integer");
    });

    test("Test if ParkingLot isn't created with openHour < 0 or closeHour < 0", () => {
        expect(() => new ParkingLot("Shopping", 50, 1, -1, 23)).toThrowError("The ParkingLot close hour is in 24 hour format");
        expect(() => new ParkingLot("Shopping", 50, 1, 1, -23)).toThrowError("The ParkingLot close hour is in 24 hour format");
    });

    test("Test if ParkingLot isn't created with openHour > 24 or closeHour > 24", () => {
        expect(() => new ParkingLot("Shopping", 50, 1, 25, 23)).toThrowError("The ParkingLot close hour is in 24 hour format");
        expect(() => new ParkingLot("Shopping", 50, 1, 12, 25)).toThrowError("The ParkingLot close hour is in 24 hour format");
    });
})