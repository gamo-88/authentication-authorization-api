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



// faire la route /api/users/me qui retourne l'utilisateur connecté


// faire la route /api/users/delete qui supprime l'utilisateur
// faire la route /api/users/update qui met a jour un champ de l'user

export default router