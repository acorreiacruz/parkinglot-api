import { Request, Response } from "express";
import { ControllerOutput } from "../controller/Controller";

export default class ExpressAdapter {
    static create(fn: Function) {
        return async (request: Request, response: Response) => {
            const { body, statusCode }: ControllerOutput = await fn(request.params, request.body);
            return response.status(statusCode).json(body);
        }
    }
}

