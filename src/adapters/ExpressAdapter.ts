import { Request, Response } from "express";

export default class ExpressAdapter {
    static create(fn: Function) {
        return async (request: Request, response: Response) => {
            const object = await fn(request.params, request.body);
            return response.json(object);
        }
    }
}