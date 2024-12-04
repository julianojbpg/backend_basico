import { Router, Response, Request } from "express"

const rota = Router()

rota.get('/',(req:Request, res:Response)=>{
    res.status(200).json({mensagem:'Ola mundo'})
})


rota.post('/login',(req:Request, res:Response)=>{
    const result = req.body
    res.status(200).json(result)
})

export default rota
