import express from 'express'
import userRouter from "./routes/users"

const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

app.use("/api/users", userRouter)


app.listen(port,()=>{
    console.log(`Serveur en ecout sur le port ${port}`)
})