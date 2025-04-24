import { Router } from "express";
import { getAllUsers, getUserById } from "../controller/users";


const router = Router()


// pour la requette aux url "/api/users/"
router.get("/", getAllUsers)


// pour la requette aux url "/api/users/1"
router.get("/:id", getUserById)

export default router