import { Router } from "express"
import rotasDoUsuario from "./rotasDoUsuario"

const rotas = Router()

rotas.use(rotasDoUsuario)

export default rotas
