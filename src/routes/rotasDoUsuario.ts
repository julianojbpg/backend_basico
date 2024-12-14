import { Router, Response, Request } from "express"
import { cadastroDoEnderecoUsuario, cadastroDoUsuario } from "../controllers/controllerDoUsuario"

const rotasDoUsuario = Router()


rotasDoUsuario.post('/cadastroUsuario', async (req: Request,res: Response)=>{
    await cadastroDoUsuario(req,res)
})
rotasDoUsuario.post('/cadastroEnderecoUsuario', async (req: Request,res: Response)=>{
    await cadastroDoEnderecoUsuario(req,res)
})

export default rotasDoUsuario