import ParkedCar from "./ParkedCar"

export default class ParkingLot {
    constructor(public code: string, private capacity: number, private occupiedSpaces: number, public openHour: number, public closeHour: number) {
        if (capacity <= 0) throw new Error("The ParkingLot capacity should be a positive integer");
        if (occupiedSpaces < 0) throw new Error("The Parking lot occupied spaces can't be a negative integer");
        if (closeHour < 0 || closeHour > 24) throw new Error("The ParkingLot close hour is in 24 hour format");
        if (openHour < 0 || openHour > 24) throw new Error("The ParkingLot close hour is in 24 hour format");
    }

    getCapacity(): number {
        return this.capacity;
    }

    getOccupiedSpaces(): number {
        return this.occupiedSpaces;
    }

    isFull(): boolean {
        return this.capacity == this.occupiedSpaces;
    }

    isOpen(date: Date): boolean {
        return date.getHours() > this.openHour && date.getHours() < this.closeHour;
    }
}