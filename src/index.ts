import express from 'express'
import userRouter from "./routes/users"
import { PORT } from './secret'
import     { PrismaClient } from './generated/prisma'

const app = express()

app.use(express.json())

export const prismaClient =  new PrismaClient (
    {log: ["query"]}
)


// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

app.use("/api/users", userRouter)


app.listen(PORT,()=>{
    console.log(`Serveur en ecout sur le port ${PORT} en local`)
})