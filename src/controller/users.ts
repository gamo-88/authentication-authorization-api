import { Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret";

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
        throw  Error("Utilisateur deja present avec cette addresse mail");
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
        throw Error("Utilisateur non reconu veuillez vous inscrire");
    }

    if (!compareSync(password, user.password)) {
        throw  Error("Mot de passe incorrect");
    }
    const token = jwt.sign({
        userId: user.id
    },JWT_SECRET)

    res.send({user, token});

}
