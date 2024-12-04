import express from "express"
import Rotas from "./routes/Rotas"
import {config} from 'dotenv'

config()

export const app = express()
const port = process.env.PORT 

app.use(express.json())
app.use(Rotas)

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})