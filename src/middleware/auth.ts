import { NextFunction,Request,  Response } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { prismaClient } from "..";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //1extraire le token de l'entete de la requet
  let token = req.headers.authorization;
  //2-verifier si le token est sur la requette sinon generer l'erreur de non-autorisation
  if (!token) {
    next(new UnauthorizedException("Non autoriser", ErrorCode.UNAUTHORIZED));
  }
  //3-verifier si le token est valide extraire l'id de l'user du token
  try {
    const payload: {userId: number} = jwt.verify(token!, JWT_SECRET) as {userId: number};
    //4-recuperer l'utilisateur qui a l'id du payload la
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      next(new UnauthorizedException("Non autoriser", ErrorCode.UNAUTHORIZED));
    }
    //5-renvoyer l'user verifier en le greffant a la requette pour le controller me
    req.user = user! ;
    next();
  } catch (error) {
    next(new UnauthorizedException("Non autoriser", ErrorCode.UNAUTHORIZED));
  }
};
