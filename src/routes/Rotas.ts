import { Router, Response, Request } from "express"
import { cadastroDoUsuario } from "../controllers/controlerDoUsuario"

const rota = Router()


rota.post('/cadastroUsuario', async (req: Request,res: Response)=>{
    await cadastroDoUsuario(req,res)
})

export default rota
