import { Router, Response, Request } from "express"
import { buscarUsuarioPorEmailOuCPF, cadastroDoEnderecoUsuario, cadastroDoUsuario } from "../controllers/controllerDoUsuario"

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
    await buscarUsuarioPorEmailOuCPF(req, res)
})

export default rotasDoUsuario