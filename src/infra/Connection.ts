export default interface Connection {
    query(statement: string, paramas: any): Promise<any>;
    one(statement: string, paramas: any): Promise<any>;
    close(): Promise<void>;
}