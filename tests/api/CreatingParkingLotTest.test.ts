import axios from "axios";
import PostgreSQLConnection from "../../src/infra/PostgreSQLConnection";

const baseUrl = "http://localhost:8000/api/parkinglots/";
describe('Test API CreatingParkingLot', () => {
    test('Should create a parking lot', async () => {
        const response = await axios.post(
            baseUrl,
            {
                code:"parkinglot01",
                capacity: 30,
                open_hour: 7,
                close_hour:22
            }
        );
        expect(response.data).toBe("Parking lot created with successfully");
        expect(response.status).toBe(201);
    });
});

afterEach(async () => {
    const postgreSQLConnection = new PostgreSQLConnection();
    await postgreSQLConnection.query("DELETE FROM parkinglotca.parkinglot WHERE code = $1", ["parkinglot01"]);
    await postgreSQLConnection.close();
});
