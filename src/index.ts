import express from 'express'
import userRouter from "./routes/users"
import { PORT } from './secret'

const app = express()


// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

app.use("/api/users", userRouter)


app.listen(PORT,()=>{
    console.log(`Serveur en ecout sur le port ${PORT} en local`)
})