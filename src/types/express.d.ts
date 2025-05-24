import { User } from "../generated/prisma";

declare module "express" {
  export  interface Request {
      user?: User;
    }
}

// import { User } from "../generated/prisma"; // adapte le chemin si besoin

// declare module "express" {
//   export interface Request {
//     user?: User;
//   }
// }

// src/types/express.d.ts
// import { User } from "../generated/prisma"; // Chemin à adapter si besoin

// declare global {
//   namespace Express {
//     interface Request {
//       user?: User;
//     }
//   }
// }

export {};



 