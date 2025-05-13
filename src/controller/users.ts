import { Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret";
import { BadRequestException } from "../exception/bad_request";
import { ErrorCode } from "../exception/root";

export const getAllUsers = (req: Request, res: Response) => {
    res.send([])
};
export const getUserById = (req: Request, res: Response) => {
    res.send({})
};

export const signup = async (req: Request, res: Response)=>{

    const {name, email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}});

    if(user){
        throw new BadRequestException("Utilisateur deja present avec cette addresse mail", ErrorCode.USER_ALREADY_EXISTS);
    }

    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password: hashSync(password, 10)
        }
    });

    res.send(user);

}
export const signin = async (req: Request, res: Response)=>{

    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}});

    if(!user){
        throw new BadRequestException("Utilisateur non reconu veuillez vous inscrire", ErrorCode.USER_NOT_FOUND);
    }

    if (!compareSync(password, user.password)) {
        throw  new BadRequestException("Mot de passe incorrect", ErrorCode.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({
        userId: user.id
    },JWT_SECRET)

    res.send({user, token});

}
