import { Router } from "express";
import { getAllUsers, getUserById, signin, signup } from "../controller/users";


const router = Router()




// pour la requette aux url "/api/users/"
router.get("/", getAllUsers)


// pour la requette aux url "/api/users/1"
router.get("/:id", getUserById)


// pour la requette aux url "/api/users/" en post
router.post("/", signup)


// pour la requette aux url "/api/users/signIn" en post
router.post("/signIn", signin)

export default router