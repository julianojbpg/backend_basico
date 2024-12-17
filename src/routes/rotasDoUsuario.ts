import { Router, Response, Request } from "express"
import { buscarUsuario, cadastroDoEnderecoUsuario, cadastroDoUsuario } from "../controllers/controllerDoUsuario"

const rotasDoUsuario = Router()

// rotas de cadastro
rotasDoUsuario.post('/cadastroUsuario', async (req: Request,res: Response)=>{
    await cadastroDoUsuario(req,res)
})
rotasDoUsuario.post('/cadastroEnderecoUsuario', async (req: Request,res: Response)=>{
    await cadastroDoEnderecoUsuario(req,res)
})

// rotas de busca
rotasDoUsuario.post('/buscarUsuario', async (req: Request,res: Response)=>{
    await buscarUsuario(req, res)
})

export default rotasDoUsuario