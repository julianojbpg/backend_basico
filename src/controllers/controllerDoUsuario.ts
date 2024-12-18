import { Request, Response } from 'express'
import { iEndereco, iUsuario } from '../@types/iUsuario'
import { hash } from 'bcrypt'

import { 
    validacaoCampoCPFouEmail, 
    validacaoCamposDoEndereco, 
    validacaoCamposDoUsuario 
} from '../validations/validateUser'

import * as yup from 'yup'
import { 
    buscarUsuarioNoBanco, 
    cadastrarEnderecoNoBanco, 
    cadastrarUsuarioNoBanco 
} from '../database/CRUD_Usuario'



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
            return res.status(200).json({ status: false, mensagem: error.errors })
        return res.status(200).json({ status: false, mensagem: error })
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
            return res.status(200).json({ status: false, mensagem: error.errors })
        return res.status(200).json({ status: false, mensagem: error })
    }
}
// Read
export async function buscarUsuarioPorEmailOuCPF(req: Request, res: Response) {

    const status = await validacaoCampoCPFouEmail(req.body)
    const { cpf, email } = req.body

    if (status) {

        try {
            const result = await buscarUsuarioNoBanco(email, cpf)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(200).json({ status: false, mensagem: error })
        }

    } else {
        return res.status(400).json({ status: false, mensagem: 'Não foi encontrado as proriedades email ou cpf para buscar no servidor' })
    }
}