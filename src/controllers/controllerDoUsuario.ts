import { Request, Response } from 'express'
import { iEndereco, iUsuario } from '../@types/iUsuario'
import { hash } from 'bcrypt'
import { STATUSCODE } from '../@types/STATUSCODE'

import {
    validacaoCampoCPFouEmail,
    validacaoCamposDoEndereco,
    validacaoCamposDoUsuario,
    validar_Atualizacao_Usuario,
    validar_Id_Usuario
} from '../validations/validateUser'

import * as yup from 'yup'
import {
    atualizarUsuarioNoBanco,
    buscarUsuarioNoBanco,
    cadastrarEnderecoNoBanco,
    cadastrarUsuarioNoBanco,
    deletarUsuarioNoBanco
} from '../database/CRUD_Usuario'



// Create
export async function cadastroDoUsuario(req: Request, res: Response) {
    try {
        const usuario = await validacaoCamposDoUsuario(req.body) as iUsuario
        usuario.senha = await hash(usuario.senha, 10)
        const result = await cadastrarUsuarioNoBanco(usuario)
        return res.status(STATUSCODE.OK).json(result)
    }
    catch (error) {
        if (error instanceof yup.ValidationError)
            return res.status(STATUSCODE.BADREQUEST).json({
                status: false,
                mensagem: error.errors
            })
        return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
            status: false,
            mensagem: error
        })
    }
}

export async function cadastroDoEnderecoUsuario(req: Request, res: Response) {
    try {
        const endereco = await validacaoCamposDoEndereco(req.body) as iEndereco
        const result = await cadastrarEnderecoNoBanco(endereco)
        return res.status(STATUSCODE.OK).json(result)
    }
    catch (error) {
        if (error instanceof yup.ValidationError)
            return res.status(STATUSCODE.BADREQUEST).json({
                status: false,
                mensagem: error.errors
            })
        return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
            status: false,
            mensagem: error
        })
    }
}
// Read
export async function buscarUsuarioPorEmailOuCPF(req: Request, res: Response) {

    const status = await validacaoCampoCPFouEmail(req.body)
    const { cpf, email } = req.body

    if (status) {

        try {
            const result = await buscarUsuarioNoBanco(email, cpf)
            return res.status(STATUSCODE.OK).json(result)
        } catch (error) {
            return res.status(STATUSCODE.BADREQUEST).json({
                status: false,
                mensagem: error
            })
        }

    } else {
        return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
            status: false,
            mensagem: 'Não foi encontrado as proriedades email ou cpf para buscar no servidor'
        })
    }
}
// Delete

export async function deletarUsuarioPorID(req: Request, res: Response) {
    const validacao = await validar_Id_Usuario(req.body)
    if (validacao) {
        try {
            const result = await deletarUsuarioNoBanco(req.body.id)
            return res.status(STATUSCODE.OK).json(result)

        } catch (error) {
            if (error instanceof yup.ValidationError)
                return res.status(STATUSCODE.BADREQUEST).json({
                    status: false,
                    mensagem: error.errors
                })
            return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
                status: false,
                mensagem: error
            })
        }
    }
    return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
        status: false,
        mensagem: 'O id não foi encontrado'
    })
}

//Update

export async function atualizarUsuario(req: Request, res: Response) {
    const validacao = await validar_Atualizacao_Usuario(req.body)
    if (validacao) {
        try {
            const result = await atualizarUsuarioNoBanco(req.body)
            return res.status(STATUSCODE.OK).json(result)

        } catch (error) {
            if (error instanceof yup.ValidationError)
                return res.status(STATUSCODE.BADREQUEST).json({
                    status: false,
                    mensagem: error.errors
                })
            return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
                status: false,
                mensagem: error
            })
        }
    }
    return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
        status: false,
        mensagem: 'Erro interno no servidor na hora da atualização'
    })
}