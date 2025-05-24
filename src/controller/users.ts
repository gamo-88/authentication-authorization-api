import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { BadRequestException } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { UnprocesssableEntity } from "../exceptions/validations";
import { SigninSchema, SignupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/notFound";

export const getAllUsers = (req: Request, res: Response) => {
  res.send([]);
};
export const getUserById = (req: Request, res: Response) => {
  res.send({});
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SignupSchema.parse(req.body);
    const { name, email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) {
      next(
        new BadRequestException(
          "Utilisateur deja present avec cette addresse mail",
          ErrorCode.USER_ALREADY_EXISTS
        )
      );
    }

    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });

    res.send(user);
  } catch (error: any) {
    next(
      new UnprocesssableEntity(
        "Can't process this",
        error?.issues,
        ErrorCode.UNPROCESSABLE
      )
    );
  }
};
export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    SigninSchema.parse(req.body)
    const { email, password } = req.body;
    let user = await prismaClient.user.findFirst({ where: { email } });


    if (!user) {
      throw new NotFoundException(
        "Utilisateur non reconu veuillez vous inscrire",
        ErrorCode.USER_NOT_FOUND
      );
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException(
        "Mot de passe incorrect",
        ErrorCode.INCORRECT_PASSWORD
      );
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );

    res.send({ user, token });
  } catch (error: any) {
    next( new UnprocesssableEntity("Donnees non valides pour le signIn", error?.issues, ErrorCode.UNPROCESSABLE) );
  }
};

// faire le controller pour route /api/users/me qui retourne l'utilisateur connecté

export const me = async(req: Request, res: Response, next: NextFunction)=>{
  res.json(req.user)
    
}
// faire le controller pour route /api/users/delete qui supprime l'utilisateur
// faire le controller pour route /api/users/update qui met a jour un champ de l'user
// Ajouter a user le champ picture en optionnel et gerer le fichiers dans mon serveur pour garder les photos de l'utilisateur "multer" 
