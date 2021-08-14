import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import services from "./services/index.js"

const { PORT } = process.env
const app = express()

app.use(cors())
app.use(express.json())

app.use("/", services)

console.log(listEndpoints(app))

const onListening = () => console.log("Server is up on : ", PORT)
const onError = (error) => console.log("server crushed due to ", error)

app.listen(PORT, onListening)

app.on("error", onError)