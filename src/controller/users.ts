import { Request, Response } from "express";

export const getAllUsers = (request: Request, response: Response) => {
    response.send([])
};
export const getUserById = (request: Request, response: Response) => {
    response.send({})
};
