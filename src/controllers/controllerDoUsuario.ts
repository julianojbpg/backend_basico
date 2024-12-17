import { Request, Response } from 'express'
import { validacaoCamposDoEndereco, validacaoCamposDoUsuario } from '../validations/validateUser'
import * as yup from 'yup'
import { buscarUsuarioNoBanco, cadastrarEnderecoNoBanco, cadastrarUsuarioNoBanco } from '../database/CRUD_Usuario'
import { iEndereco, iUsuario } from '../@types/iUsuario'
import { hash } from 'bcrypt'


// Cerate
export async function cadastroDoUsuario(req: Request, res: Response) {
    try {
        const usuario = await validacaoCamposDoUsuario(req.body) as iUsuario
        usuario.senha = await hash(usuario.senha, 10)
        const result = await cadastrarUsuarioNoBanco(usuario)
        return res.status(200).json(result)
    }
    catch (error) {
        if (error instanceof yup.ValidationError)
            return res.status(200).json(error.errors)
        return res.status(200).json(error)
    }
}

export async function cadastroDoEnderecoUsuario(req: Request, res: Response) {
    try {
        const endereco = await validacaoCamposDoEndereco(req.body) as iEndereco
        const result = await cadastrarEnderecoNoBanco(endereco)
        return res.status(200).json(result)
    }
    catch (error) {
        if (error instanceof yup.ValidationError)
            return res.status(200).json(error.errors)
        return res.status(200).json(error)
    }
}
// Read
export async function buscarUsuario(req: Request, res: Response){
    const {cpf,email} = req.body
    try {
        const result = await buscarUsuarioNoBanco(email, cpf)
        return res.status(200).json(result)

    } catch (error) {
        return res.status(200).json({mensagem: error})
    }  
}