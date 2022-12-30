import ParkedCarRepository from "../infra/repositories/ParkedCarRepository";

export default class CheckoutParkedCar {
    constructor(private parkedCarRepository: ParkedCarRepository) { }

    async execute(code: string, plate: string): Promise<void> {
        await this.parkedCarRepository.checkoutParkedCar(code, plate);
    }
}