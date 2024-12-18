import { Router, Response, Request } from "express"
import { atualizarUsuario, buscarUsuarioPorEmailOuCPF, cadastroDoEnderecoUsuario, cadastroDoUsuario, deletarUsuarioPorID } from "../controllers/controllerDoUsuario"

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

// rota de deletar 
rotasDoUsuario.post('/deletarUsuario', async (req: Request,res: Response)=>{
    await deletarUsuarioPorID(req, res)
})

// rota de atualizar
rotasDoUsuario.post('/atualizarUsuario', async (req: Request,res: Response)=>{
    await atualizarUsuario(req, res)
})


export default rotasDoUsuario