import Connection from "./Connection";
import pgp from "pg-promise";

export default class PostgeSQLConnection implements Connection {
    private connection: any;
    
    constructor(){
        this.connection = pgp()("postgres://super:super12345@localhost:54320/projects");
    }

    query(statement: string, paramas: any[]): Promise<any> {
        return this.connection.query(statement, paramas);
    }

    one(statement: string, paramas: any[]): Promise<any> {
        return this.connection.oneOrNone(statement, paramas);
    }

    close(): Promise<void> {
        return this.connection.$pool.end();
    }
}